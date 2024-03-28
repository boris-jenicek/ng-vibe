import { IDrawerOptions } from '../interfaces';
import { DrawerInit } from './drawer.initializer.model';

export class DrawerRemoteControl {
  options: IDrawerOptions;
  payload: null | any = null;
  #drawerInitializer: DrawerInit;
  constructor(drawerInitializer: DrawerInit) {
    this.#drawerInitializer = drawerInitializer;
    this.options = drawerInitializer.options;
    this.payload = drawerInitializer.payload;
  }
  public closeDrawer(data?: any): void {
    this.#drawerInitializer.closeDrawer(data);
  }
  public openDrawer(payload?: any): void {
    this.#drawerInitializer.openDrawer(payload);
  }
  get id(): string {
    return this.#drawerInitializer.id;
  }
}
