import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@ng-vibe/button';
import { DrawerRemoteControl } from '@ng-vibe/drawer';

@Component({
  selector: 'playground-drawer-dummy',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './drawer-dummy.component.html',
  styleUrl: './drawer-dummy.component.scss',
})
export class DrawerDummyComponent {
  drawerRemoteControl: DrawerRemoteControl = inject(DrawerRemoteControl);

  constructor() {
    console.log(this.drawerRemoteControl.payload);
  }

  close(): void {
    const data = { payload: 'some important data' };
    this.drawerRemoteControl.closeDrawer(data);
  }
}
