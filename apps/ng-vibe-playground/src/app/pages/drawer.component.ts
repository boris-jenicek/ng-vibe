import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DrawerInitializer, DrawerPosition } from '@ng-vibe/drawer';
import { ButtonComponent } from '@ng-vibe/button';
import { DummyComponent } from '../components/dummy.component';

@Component({
  selector: 'ng-vibe-drawer',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  private drawer: DrawerInitializer = new DrawerInitializer();

  openDrawer() {
    this.drawer.options = {
      position: DrawerPosition.RIGHT,
      isOverlay: false,
    };
    this.drawer.openDrawer(DummyComponent);
  }

  closeDrawer() {
    this.drawer.closeDrawer();
  }
}
