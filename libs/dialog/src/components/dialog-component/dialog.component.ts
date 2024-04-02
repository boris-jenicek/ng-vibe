import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Output,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  boxAnimations,
  fadeinOutAnimation,
  overlayAnimation,
} from '../../animations';
import { AppearanceAnimation, DisappearanceAnimation } from '../../enums';
import { IDialogOptions } from '../../interfaces';
import { DialogRemoteControl } from '../../models';
import { DialogComponentHelperService } from '../../services/dialog-component-helper.service';

@Component({
  selector: 'ng-vibe-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  animations: [overlayAnimation, boxAnimations, fadeinOutAnimation],
  providers: [DialogComponentHelperService],
})
export class DialogComponent implements AfterViewInit {
  @ViewChild('dialogContent', { read: ViewContainerRef })
  dialogContent!: ViewContainerRef;
  @Output()
  animationDone = new EventEmitter<void>();
  public options!: IDialogOptions;
  public boxAnimationState:
    | AppearanceAnimation
    | DisappearanceAnimation
    | 'initial' = 'initial';
  public overlayAnimationState: 'enter' | 'leave' = 'enter';
  public contentAnimationState: 'enter' | 'leave' = 'enter';
  public overlayVisible = false;
  private loaderComponentType?: Type<any>;
  private mainComponentType?: Type<any>;
  public dialogRemoteControl!: DialogRemoteControl;
  private helper: DialogComponentHelperService = inject(
    DialogComponentHelperService
  );

  ngAfterViewInit(): void {
    this.overlayVisible = this.options.showOverlay;
    this.boxAnimationState = this.options.animationIn!;
    this.loadComponent();
  }

  public prepareComponentForLoad(
    component: Type<any>,
    remoteControl: DialogRemoteControl
  ): void {
    this.mainComponentType = component;
    this.dialogRemoteControl = remoteControl;
    if (!this.loaderComponentType) {
      // If no loader, load the main component immediately
      this.loadComponent();
    }
  }

  public stopLoader(): void {
    if (this.loaderComponentType) {
      this.contentAnimationState = 'leave';
      // timeout for smooth animation
      setTimeout(() => {
        this.loaderComponentType = undefined; // Clear loader component
        this.loadComponent(); // Load main component
      }, 300);
    }
  }

  public setLoaderComponent(component: Type<any>): void {
    this.loaderComponentType = component;
  }

  private loadComponent(): void {
    const componentType = this.loaderComponentType || this.mainComponentType;
    this.helper.loadComponent(
      this.dialogContent,
      this.dialogRemoteControl,
      componentType
    );
    this.contentAnimationState = 'enter';
  }

  onAnimationDone(event: any) {
    if (event.toState === this.options.animationOut!) {
      this.animationDone.emit();
    }
  }

  getDialogStyles() {
    let styles: { [key: string]: string } = {
      width: this.options.width,
      height: this.options.height,
      minWidth: this.options.minWidth,
      maxWidth: this.options.maxWidth,
      minHeight: this.options.minHeight,
      maxHeight: this.options.maxHeight,
    };
    if (this.options.fullScreen) {
      styles = {
        ...styles,
        width: '100vw',
        height: '100vh',
        minWidth: 'auto',
        maxWidth: 'auto',
        minHeight: 'auto',
        maxHeight: 'auto',
        borderRadius: '0',
      };
    }
    return styles;
  }
}
