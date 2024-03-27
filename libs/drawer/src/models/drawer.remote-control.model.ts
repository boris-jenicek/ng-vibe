import { IDrawerOptions } from '../interfaces';
import { DrawerInitializer } from './drawer.initializer.model';

export class DrawerRemoteControl {
  options: IDrawerOptions;
  constructor(private drawerInitializer: DrawerInitializer) {
    this.options = this.drawerInitializer.options;
  }
  public closeDrawer(): void {
    this.drawerInitializer.closeDrawer();
  }
  get id(): string {
    return this.drawerInitializer.id;
  }
}
