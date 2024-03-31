import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Injector,
  Output,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  boxAnimations,
  fadeinOutAnimation,
  overlayAnimation,
} from './animations';
import { AppearanceAnimation, DisappearanceAnimation } from './enums';
import { IDialogOptions } from './interfaces';
import { DialogRemoteControl } from './models';

@Component({
  selector: 'ng-vibe-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  animations: [overlayAnimation, boxAnimations, fadeinOutAnimation],
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
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this.overlayVisible = this.options.showOverlay;
    this.boxAnimationState = this.options.animationIn!;
    this.loadComponent();
  }

  public prepareComponentForLoad(
    component: Type<any>,
    dialogRemoteControl: DialogRemoteControl
  ): void {
    this.mainComponentType = component;
    this.dialogRemoteControl = dialogRemoteControl;
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
    if (!this.dialogContent) return; // Guard condition

    const componentType = this.loaderComponentType || this.mainComponentType;
    if (!componentType) return; // Guard condition

    const injector = Injector.create({
      providers: [
        { provide: DialogRemoteControl, useValue: this.dialogRemoteControl },
      ],
    });

    this.dialogContent.clear();
    this.dialogContent.createComponent(componentType, { injector });
    this.cd.detectChanges();
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
