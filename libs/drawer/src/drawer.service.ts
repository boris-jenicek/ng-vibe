import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Type,
} from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { DrawerComponent } from './drawer.component';
import { AnimationEnum } from './enums';
import { DrawerRemoteControl } from './models';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private drawers: Map<string, ComponentRef<DrawerComponent>> = new Map();
  private drawerStates: BehaviorSubject<Map<string, boolean>> =
    new BehaviorSubject(new Map());
  public drawerStates$: Observable<Map<string, boolean>> =
    this.drawerStates.asObservable();

  private appRef: ApplicationRef = inject(ApplicationRef);
  private environmentInjector: EnvironmentInjector = this.appRef.injector;

  public open(
    drawerRemoteControl: DrawerRemoteControl,
    component: Type<any>
  ): void {
    if (this.drawers.get(drawerRemoteControl.id)) {
      return;
    }

    const drawerComponentRef = createComponent(DrawerComponent, {
      environmentInjector: this.environmentInjector,
    });

    this.drawers.set(drawerRemoteControl.id, drawerComponentRef);
    if (component) {
      drawerComponentRef.instance.prepareComponentForLoad(
        component,
        drawerRemoteControl
      );
    }

    this.updateDrawerState(drawerRemoteControl.id, true);
    drawerComponentRef.instance.options = drawerRemoteControl.options;
    drawerComponentRef.instance.animationState = `${drawerRemoteControl.options.position}_${AnimationEnum.CLOSED}`;
    this.appRef.attachView(drawerComponentRef.hostView);
    const domElem = drawerComponentRef.location.nativeElement;
    document.body.appendChild(domElem);
  }

  public close(id: string): void {
    const drawerComponentRef = this.drawers.get(id);

    if (drawerComponentRef) {
      drawerComponentRef.instance.animationState = `${drawerComponentRef.instance.options.position}_${AnimationEnum.CLOSED}`;
      drawerComponentRef.instance.animationDone.pipe(take(1)).subscribe(() => {
        this.appRef.detachView(drawerComponentRef.hostView);
        drawerComponentRef.destroy();
        this.drawers.delete(id);
        this.updateDrawerState(id, false);
      });
    }
  }

  updateDrawerState(id: string, isOpen: boolean): void {
    const currentState = this.drawerStates.getValue();
    const newState = new Map(currentState).set(id, isOpen);
    this.drawerStates.next(newState);
  }
}
