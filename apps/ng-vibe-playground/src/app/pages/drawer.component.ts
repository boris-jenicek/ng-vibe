import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@ng-vibe/button';
import { DrawerInit, DrawerPosition, DrawerService } from '@ng-vibe/drawer';
import { DummyComponent } from '../components/dummy.component';

@Component({
  selector: 'ng-vibe-drawer',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  private drawer: DrawerInit = new DrawerInit(DummyComponent);
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
