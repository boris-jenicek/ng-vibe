import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@ng-vibe/button';
import {
  DrawerPosition,
  DrawerRemoteControl,
  DrawerService,
} from '@ng-vibe/drawer';
import { DrawerDummyComponent } from '../../components/drawer-dummy/drawer-dummy.component';

@Component({
  selector: 'playground-drawer',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './playground-drawer.component.html',
  styleUrl: './playground-drawer.component.scss',
})
export class PlaygroundDrawerComponent {
  public drawerService: DrawerService = inject(DrawerService);
  private position: DrawerPosition = DrawerPosition.RIGHT;
  private loader = true;

  constructor() {
    /*  this.drawerService
      .selectRemoteControl$(this.drawer.id)
      .subscribe((resp) => {
        console.log('sub', resp);
      });*/
  }
  openDrawer() {
    const drawer = new DrawerRemoteControl(DrawerDummyComponent);
    drawer.options = {
      position: this.position,
    };
    if (this.loader) {
      drawer.withLoader();
    }
    drawer.openDrawer({ my: 'book' }).subscribe((resp) => {
      console.log('resp', resp);
    });

    setTimeout(() => {
      drawer.stopLoader();
    }, 500);
  }

  setPosition(position: DrawerPosition | string) {
    this.position = position as DrawerPosition;
  }

  setLoader(loader: boolean) {
    this.loader = loader;
  }
}
