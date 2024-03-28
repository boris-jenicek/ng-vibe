import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@ng-vibe/button';
import { DrawerRemoteControl } from '@ng-vibe/drawer';

@Component({
  selector: 'ng-vibe-dummy',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './dummy.component.html',
  styleUrl: './dummy.component.scss',
})
export class DummyComponent {
  drawerRemoteControl: DrawerRemoteControl = inject(DrawerRemoteControl);

  constructor() {
    console.log(this.drawerRemoteControl.payload);
  }

  close(): void {
    const data = { payload: 'some important data' };
    this.drawerRemoteControl.closeDrawer(data);
  }
}
