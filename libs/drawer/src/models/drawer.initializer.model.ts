import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DEFAULT_DRAWER_OPTIONS_BOTTOM,
  DEFAULT_DRAWER_OPTIONS_LEFT,
  DEFAULT_DRAWER_OPTIONS_RIGHT,
  DEFAULT_DRAWER_OPTIONS_TOP,
} from '../config';
import { DrawerService } from '../drawer.service';
import { DrawerPosition } from '../enums';
import { IDrawerOptions } from '../interfaces';
import { generateRandomString, ServiceLocator } from '../tools';
import { DrawerRemoteControl } from './drawer.remote-control.model';

export class DrawerInit {
  readonly id = generateRandomString();
  #options: IDrawerOptions = DEFAULT_DRAWER_OPTIONS_RIGHT;
  readonly #childComponent: Type<any>;
  payload: null | any = null;
  set options(options: IDrawerOptions) {
    this.#options = {
      ...this.#options,
      ...this.#preSetup(options),
    };
  }
  get options(): IDrawerOptions {
    return this.#options;
  }
  private drawerService: DrawerService;

  constructor(component: Type<any>) {
    this.#childComponent = component;
    this.drawerService = ServiceLocator.injector.get(DrawerService);
  }

  public openDrawer(payload?: any): Observable<any> {
    this.payload = payload || null;
    return this.drawerService.open(
      new DrawerRemoteControl(this),
      this.#childComponent
    );
  }

  public closeDrawer(data?: any): void {
    this.drawerService.close(this.id, data);
  }

  #preSetup(options: IDrawerOptions): IDrawerOptions {
    let preSetup = options;
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
