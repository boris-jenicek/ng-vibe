import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@ng-vibe/button';
import { DialogRemoteControl } from '@ng-vibe/dialog';

@Component({
  selector: 'playground-dialog-dummy',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './dialog-dummy.component.html',
  styleUrl: './dialog-dummy.component.scss',
})
export class DialogDummyComponent {
  drawerRemoteControl: DialogRemoteControl = inject(DialogRemoteControl);

  constructor() {
    // console.log(this.drawerRemoteControl.payload);
  }

  close(): void {
    const data = { payload: 'some important data' };
    this.drawerRemoteControl.closeDialog(data);
  }
}
