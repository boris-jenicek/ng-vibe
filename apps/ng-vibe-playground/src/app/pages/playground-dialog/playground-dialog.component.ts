import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@ng-vibe/button';
import { DialogRemoteControl, DialogService } from '@ng-vibe/dialog';
import { DialogDummyComponent } from '../../components/dialog-dummy/dialog-dummy.component';

@Component({
  selector: 'playground-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './playground-dialog.component.html',
  styleUrl: './playground-dialog.component.scss',
})
export class PlaygroundDialogComponent {
  private dialog: DialogRemoteControl = new DialogRemoteControl(
    DialogDummyComponent
  );

  public service: DialogService = inject(DialogService);

  constructor() {
    this.service.selectRemoteControl$(this.dialog.id).subscribe((resp) => {
      console.log('sub', resp);
    });

    this.service.activeDialogsCount$.subscribe((resp) => {
      console.log('sub', resp);
    });

    const dialog1: DialogRemoteControl = new DialogRemoteControl(
      DialogDummyComponent
    );
    const dialog2: DialogRemoteControl = new DialogRemoteControl(
      DialogDummyComponent
    );
    const dialog3: DialogRemoteControl = new DialogRemoteControl(
      DialogDummyComponent
    );

    dialog1.openDialog();
    dialog2.openDialog();
    dialog3.openDialog();

    setTimeout(() => {
      this.service.closeAll();
    }, 2000);
  }
  openDialog() {
    this.dialog.options = {
      width: '700px',
      height: '500px',
      //fullScreen: true,
    };
    this.dialog.withLoader();
    // this.dialog.withLoader(SimpleLoaderComponent);
    this.dialog.openDialog().subscribe((resp) => {
      //console.log('resp', resp);
    });

    setTimeout(() => {
      console.log('STOP LOADER');
      this.dialog.stopLoader();
    }, 2000);
  }

  closeDrawer() {
    this.dialog.closeDialog();
  }
}
