import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '@ng-vibe/button';
import { DialogRemoteControl } from '@ng-vibe/dialog';
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

  //public drawerService: DrawerService = inject(DrawerService);

  /*  constructor() {
    this.drawerService.getDrawerState(this.drawer.id).subscribe((resp) => {
      console.log('sub', resp);
    });
  }*/
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
