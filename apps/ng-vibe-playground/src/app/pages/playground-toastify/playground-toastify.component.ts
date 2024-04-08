import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@ng-vibe/button';
import {
  ProgressBar,
  TextAlignEnum,
  ToastifyRemoteControl,
  ToastifyService,
  ToastPosition,
  ToastTypeEnum,
} from '@ng-vibe/toastify';
import { AppearanceAnimation } from '../../../../../../libs/toastify/src/enums';

@Component({
  selector: 'playground-toastify',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './playground-toastify.component.html',
  styleUrl: './playground-toastify.component.scss',
})
export class PlaygroundToastifyComponent {
  private toasts: ToastifyRemoteControl[] = [];
  private toast: ToastifyRemoteControl = new ToastifyRemoteControl();

  public service: ToastifyService = inject(ToastifyService);

  constructor() {
    this.service.selectRemoteControl$(this.toast.id).subscribe((resp) => {
      setTimeout(() => {
        /*resp.options = {
          autoCloseDuration: 9000,
          text: '333',
          layoutType: ToastTypeEnum.DANGER,
          showIcon: false,
          progressBar: ProgressBar.DECREASE,
        };*/
        //resp.getTimer().pause();
        resp.getTimer().setMilliseconds(20000);
      }, 2000);
    });

    //this.toast.openToast();
    //this.openToast('success');
    /* setTimeout(() => {
      this.service.closeAll();
    }, 3000);*/
  }

  openToast(type: ToastTypeEnum | string) {
    const position = this.toasts.push(new ToastifyRemoteControl());
    this.toasts[position - 1].options = {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      title: 'Title',
      autoCloseDuration: 3000,
      layoutType: type as ToastTypeEnum,
      position: ToastPosition.TOP_LEFT,
      progressBar: ProgressBar.DECREASE,
      textAlign: TextAlignEnum.START,
      animationIn: AppearanceAnimation.BOUNCE_IN,
    };

    this.toasts[position - 1].openToast('Async job done! 🍄');
  }

  closeLatest() {
    const length = this.toasts.length;
    this.toasts[length - 1].closeToast();
    this.toasts.pop();
  }

  closeAll() {
    this.service.closeAll();
  }
}
