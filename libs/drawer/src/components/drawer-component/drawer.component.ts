import { NgStyle } from '@angular/common';
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
import { drawerAnimations } from '../../animations';
import { fadeinOutAnimation } from '../../animations/fadein-out-animation';
import { overlayAnimation } from '../../animations/overlay-animation';
import { AnimationEnum, DrawerPosition } from '../../enums';
import { IDrawerOptions } from '../../interfaces';
import { DrawerRemoteControl } from '../../models';
import { DrawerComponentHelperService } from '../../services';

@Component({
  selector: 'ng-vibe-drawer',
  standalone: true,
  imports: [NgStyle],
  templateUrl: 'drawer.component.html',
  animations: [drawerAnimations, overlayAnimation, fadeinOutAnimation],
  providers: [DrawerComponentHelperService],
})
export class DrawerComponent implements AfterViewInit {
  @ViewChild('drawerContent', { read: ViewContainerRef })
  drawerContent!: ViewContainerRef;
  @Output() animationDone = new EventEmitter<void>();
  public options!: IDrawerOptions;
  animationState!: string;
  overlayVisible = false;
  public contentAnimationState: 'enter' | 'leave' = 'enter';
  private loaderComponentType?: Type<any>;
  private mainComponentType?: Type<any>;
  private drawerRemoteControl!: DrawerRemoteControl;
  private helper: DrawerComponentHelperService = inject(
    DrawerComponentHelperService
  );
  ngAfterViewInit(): void {
    this.overlayVisible = this.options.showOverlay;
    this.animationState = `${this.options.position}_${AnimationEnum.OPEN}`;
    this.loadComponent();
  }

  public prepareComponentForLoad(
    component: Type<any>,
    remoteControl: DrawerRemoteControl
  ): void {
    this.mainComponentType = component;
    this.drawerRemoteControl = remoteControl;
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
      this.drawerContent,
      this.drawerRemoteControl,
      componentType
    );
    this.contentAnimationState = 'enter';
  }

  onAnimationDone(event: any) {
    if (event.toState === `${this.options.position}_${AnimationEnum.CLOSED}`) {
      this.animationDone.emit();
    }
  }

  onAnimationStart(event: any) {
    if (event.fromState === `${this.options.position}_${AnimationEnum.OPEN}`) {
      this.overlayVisible = false;
    }
  }

  getDrawerStyles() {
    const styles: { [key: string]: string } = {
      width: this.options.width!,
      height: this.options.height!,
    };

    switch (this.options.position) {
      case DrawerPosition.LEFT:
        styles['left'] = '0';
        styles['bottom'] = '0';
        styles['top'] = '0';
        break;
      case DrawerPosition.RIGHT:
        styles['right'] = '0';
        styles['bottom'] = '0';
        styles['top'] = '0';
        break;
      case DrawerPosition.TOP:
        styles['top'] = '0';
        styles['left'] = '0';
        styles['right'] = '0';
        break;
      case DrawerPosition.BOTTOM:
        styles['bottom'] = '0';
        styles['left'] = '0';
        styles['right'] = '0';

        break;
    }

    return styles;
  }
}
