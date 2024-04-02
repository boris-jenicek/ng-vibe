import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultLoaderComponent } from '../components';
import { DEFAULT_DIALOG_OPTIONS } from '../config';
import { IDialogOptions } from '../interfaces';
import { DialogService } from '../services';
import { generateRandomString, ServiceLocator } from '../tools';

/**
 * Provides control over a specific dialog instance, allowing for opening, closing, and configuring the dialog.
 */
export class DialogRemoteControl {
  /** A unique identifier for the dialog instance. */
  readonly id = generateRandomString();
  #options: IDialogOptions = DEFAULT_DIALOG_OPTIONS;
  readonly #childComponent: Type<any>;
  #loaderComponent?: Type<any>;
  /** Custom payload data that can be passed to the dialog. */
  public payload: null | any = null;

  /**
   * Sets dialog options, merging provided options with default dialog options.
   * @param {Partial<IDialogOptions>} options Custom options to configure the dialog.
   */
  set options(options: Partial<IDialogOptions>) {
    this.#options = {
      ...this.#options,
      ...this.#preSetup(options),
    };
  }

  /**
   * Returns the current configuration options of the dialog.
   * @returns {IDialogOptions} The current set of dialog options.
   */
  get options(): IDialogOptions {
    return this.#options;
  }
  private dialogService: DialogService;

  constructor(component: Type<any>) {
    this.#childComponent = component;
    this.dialogService = ServiceLocator.injector.get(DialogService);
  }

  /**
   * Configures the dialog to show a loader until explicitly stopped. Optionally, a custom loader component can be provided.
   * @param {Type<any>=} component The component to use as a loader. If not provided, a default loader is used.
   */
  public withLoader(component?: Type<any>): void {
    this.#loaderComponent = component || DefaultLoaderComponent;
  }

  /**
   * Stops the loader, if any, and reveals the dialog's main content.
   */
  public stopLoader(): void {
    this.dialogService.removeLoaderComponent(this.id);
  }

  /**
   * Opens the dialog with the configured settings and component. Optionally, a payload can be passed to the dialog.
   * @param {any=} payload Custom data to be passed to the dialog component.
   * @returns {Observable<any>} An Observable that emits when the dialog is closed, returning any result data.
   */
  public openDialog(payload?: any): Observable<any> {
    this.payload = payload || null;
    return this.dialogService.open(
      this,
      this.#childComponent,
      this.#loaderComponent
    );
  }

  /**
   * Closes the dialog and optionally returns data to the opener.
   * @param {any=} data Optional data to return as the result of the dialog.
   */
  public closeDialog(data?: any): void {
    this.dialogService.close(this.id, data);
  }

  #preSetup(options: Partial<IDialogOptions>): IDialogOptions {
    return {
      ...DEFAULT_DIALOG_OPTIONS,
      ...options,
    };
  }
}
