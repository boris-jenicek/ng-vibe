import { NgStyle } from '@angular/common';
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
import { drawerAnimations } from './animations';
import { overlayAnimation } from './animations/overlay-animation';
import { AnimationEnum, DrawerPosition } from './enums';
import { IDrawerOptions } from './interfaces';
import { DrawerRemoteControl } from './models';

@Component({
  selector: 'x-drawer',
  standalone: true,
  animations: [drawerAnimations, overlayAnimation],
  templateUrl: 'drawer.component.html',
  imports: [NgStyle],
})
export class DrawerComponent implements AfterViewInit {
  @ViewChild('drawerContent', { read: ViewContainerRef })
  drawerContent!: ViewContainerRef;
  @Output() animationDone = new EventEmitter<void>();
  public options!: IDrawerOptions;
  animationState!: string;
  overlayVisible = false;
  private componentToLoad: Type<any> | null = null;
  private drawerRemoteControl!: DrawerRemoteControl;
  private injector: Injector = inject(Injector);
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  ngAfterViewInit(): void {
    this.overlayVisible = !!this.options.isOverlay;
    this.animationState = `${this.options.position}_${AnimationEnum.OPEN}`;
    if (this.componentToLoad) {
      this.loadComponent(this.componentToLoad, this.drawerRemoteControl);
    }
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

  public prepareComponentForLoad(
    component: Type<any>,
    drawerRemoteControl: DrawerRemoteControl
  ): void {
    this.componentToLoad = component;
    this.drawerRemoteControl = drawerRemoteControl;
    if (this.drawerContent) {
      this.loadComponent(component, drawerRemoteControl);
    }
  }

  private loadComponent(
    component: Type<any>,
    drawerRemoteControl: DrawerRemoteControl
  ): void {
    const injector = Injector.create({
      providers: [
        { provide: DrawerRemoteControl, useValue: drawerRemoteControl },
      ],
      parent: this.injector,
    });

    this.drawerContent.clear();
    this.drawerContent.createComponent(component, { injector });
    this.cd.detectChanges();
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
