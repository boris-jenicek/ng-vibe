import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultLoaderComponent } from '../components/default-loader/default-loader.component';
import { DEFAULT_DIALOG_OPTIONS } from '../config';
import { DialogService } from '../dialog.service';
import { IDialogOptions } from '../interfaces';
import { generateRandomString, ServiceLocator } from '../tools';

export class DialogRemoteControl {
  readonly id = generateRandomString();
  #options: IDialogOptions = DEFAULT_DIALOG_OPTIONS;
  readonly #childComponent: Type<any>;
  #loaderComponent?: Type<any>;
  payload: null | any = null;

  set options(options: Partial<IDialogOptions>) {
    this.#options = {
      ...this.#options,
      ...this.#preSetup(options),
    };
  }
  get options(): IDialogOptions {
    return this.#options;
  }
  private dialogService: DialogService;

  constructor(component: Type<any>) {
    this.#childComponent = component;
    this.dialogService = ServiceLocator.injector.get(DialogService);
  }
  public withLoader(component?: Type<any>): void {
    this.#loaderComponent = component || DefaultLoaderComponent;
  }

  public stopLoader(): void {
    this.dialogService.removeLoaderComponent(this.id);
  }

  public openDialog(payload?: any): Observable<any> {
    this.payload = payload || null;
    return this.dialogService.open(
      this,
      this.#childComponent,
      this.#loaderComponent
    );
  }

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
