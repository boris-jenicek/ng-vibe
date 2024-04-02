import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultLoaderComponent } from '../components';
import {
  DEFAULT_DRAWER_OPTIONS_BOTTOM,
  DEFAULT_DRAWER_OPTIONS_LEFT,
  DEFAULT_DRAWER_OPTIONS_RIGHT,
  DEFAULT_DRAWER_OPTIONS_TOP,
} from '../config';
import { DrawerPosition } from '../enums';
import { IDrawerOptions } from '../interfaces';
import { DrawerService } from '../services';
import { generateRandomString, ServiceLocator } from '../tools';

/**
 * Provides control over a specific drawer instance, enabling the manipulation of drawer states and configuration.
 */
export class DrawerRemoteControl {
  /** A unique identifier for the drawer instance. */
  readonly id = generateRandomString();
  #options: IDrawerOptions = DEFAULT_DRAWER_OPTIONS_RIGHT;
  readonly #childComponent: Type<any>;
  #loaderComponent?: Type<any>;
  /** Custom payload data that can be passed to the drawer. */
  public payload: null | any = null;

  /**
   * Sets drawer options, merging provided options with the default drawer options.
   * @param {Partial<IDrawerOptions>} options - Custom options to configure the drawer.
   */
  set options(options: Partial<IDrawerOptions>) {
    this.#options = {
      ...this.#options,
      ...this.#preSetup(options),
    };
  }

  /**
   * Returns the current configuration options of the drawer.
   * @returns {IDrawerOptions} The current set of drawer options.
   */
  get options(): IDrawerOptions {
    return this.#options;
  }
  private drawerService: DrawerService;

  constructor(component: Type<any>) {
    this.#childComponent = component;
    this.drawerService = ServiceLocator.injector.get(DrawerService);
  }

  /**
   * Configures the drawer to show a loader until explicitly stopped. Optionally, a custom loader component can be provided.
   * @param {Type<any>=} component - The component to use as a loader. If not provided, a default loader is used.
   */
  public withLoader(component?: Type<any>): void {
    this.#loaderComponent = component || DefaultLoaderComponent;
  }

  /**
   * Placeholder for stopping the loader. Implement this method based on your drawer service's capability to handle loader components.
   */
  public stopLoader(): void {
    this.drawerService.removeLoaderComponent(this.id);
  }

  /**
   * Opens the drawer with the configured settings and component. Optionally, a payload can be passed to the drawer component.
   * @param {any=} payload - Custom data to be passed to the drawer component.
   * @returns {Observable<any>} - An Observable that emits when the drawer is closed, returning any result data.
   */
  public openDrawer(payload?: any): Observable<any> {
    this.payload = payload || null;
    return this.drawerService.open(
      this,
      this.#childComponent,
      this.#loaderComponent
    );
  }

  /**
   * Closes the drawer and optionally returns data to the opener.
   * @param {any=} data - Optional data to return as the result of the drawer closing.
   */
  public closeDrawer(data?: any): void {
    this.drawerService.close(this.id, data);
  }

  #preSetup(options: Partial<IDrawerOptions>): IDrawerOptions {
    let preSetup: IDrawerOptions = DEFAULT_DRAWER_OPTIONS_LEFT;
    switch (options.position) {
      case DrawerPosition.LEFT: {
        preSetup = {
          ...DEFAULT_DRAWER_OPTIONS_LEFT,
          ...options,
        };
        break;
      }
      case DrawerPosition.RIGHT: {
        preSetup = {
          ...DEFAULT_DRAWER_OPTIONS_RIGHT,
          ...options,
        };
        break;
      }
      case DrawerPosition.TOP: {
        preSetup = {
          ...DEFAULT_DRAWER_OPTIONS_TOP,
          ...options,
        };
        break;
      }
      case DrawerPosition.BOTTOM: {
        preSetup = {
          ...DEFAULT_DRAWER_OPTIONS_BOTTOM,
          ...options,
        };
        break;
      }
    }
    return preSetup;
  }
}
