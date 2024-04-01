import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@ng-vibe/button';
import { DrawerInit, DrawerPosition, DrawerService } from '@ng-vibe/drawer';
import { DrawerDummyComponent } from '../../components/drawer-dummy/drawer-dummy.component';

@Component({
  selector: 'playground-drawer',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './playground-drawer.component.html',
  styleUrl: './playground-drawer.component.scss',
})
export class PlaygroundDrawerComponent {
  private drawer: DrawerInit = new DrawerInit(DrawerDummyComponent);
  public drawerService: DrawerService = inject(DrawerService);

  constructor() {
    this.drawerService.getDrawerState(this.drawer.id).subscribe((resp) => {
      console.log('sub', resp);
    });
  }
  openDrawer() {
    this.drawer.options = {
      position: DrawerPosition.RIGHT,
      isOverlay: false,
    };
    this.drawer.openDrawer({ my: 'book' }).subscribe((resp) => {
      console.log('resp', resp);
    });
  }

  closeDrawer() {
    this.drawer.closeDrawer();
  }
}
