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
  private drawer: DrawerRemoteControl = new DrawerRemoteControl(
    DrawerDummyComponent
  );
  public drawerService: DrawerService = inject(DrawerService);

  constructor() {
    /*  this.drawerService
      .selectRemoteControl$(this.drawer.id)
      .subscribe((resp) => {
        console.log('sub', resp);
      });*/
  }
  openDrawer() {
    this.drawer.options = {
      position: DrawerPosition.RIGHT,
      showOverlay: false,
      // width: '100px',
    };
    this.drawer.withLoader();
    this.drawer.openDrawer({ my: 'book' }).subscribe((resp) => {
      console.log('resp', resp);
    });

    setTimeout(() => {
      console.log('STOP LOADER');
      this.drawer.stopLoader();
    }, 2000);
  }

  closeDrawer() {
    this.drawer.closeDrawer();
  }
}
