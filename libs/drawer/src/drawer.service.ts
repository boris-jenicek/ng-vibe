import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Type,
} from '@angular/core';
import { BehaviorSubject, filter, map, Observable, Subject, take } from 'rxjs';
import { DrawerComponent } from './drawer.component';
import { AnimationEnum } from './enums';
import { DrawerRemoteControl } from './models';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private appRef: ApplicationRef = inject(ApplicationRef);
  private environmentInjector = inject(EnvironmentInjector);
  private drawers = new Map<string, ComponentRef<DrawerComponent>>();
  private drawerCloseSubject = new Subject<{ id: string; data: any }>();
  public drawerStatesSubject = new BehaviorSubject<
    Map<string, DrawerRemoteControl>
  >(new Map());
  public drawerStates$ = this.drawerStatesSubject.asObservable();

  public open(
    drawerRemoteControl: DrawerRemoteControl,
    component: Type<any>
  ): Observable<any> {
    if (this.drawers.has(drawerRemoteControl.id)) {
      return this.listenForClose(drawerRemoteControl.id);
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

    this.updateDrawerState(drawerRemoteControl.id, drawerRemoteControl);
    drawerComponentRef.instance.options = drawerRemoteControl.options;
    drawerComponentRef.instance.animationState = `${drawerRemoteControl.options.position}_${AnimationEnum.CLOSED}`;
    this.appRef.attachView(drawerComponentRef.hostView);
    const domElem = drawerComponentRef.location.nativeElement;
    document.body.appendChild(domElem);

    return this.listenForClose(drawerRemoteControl.id);
  }

  public close(id: string, data?: any): void {
    const drawerComponentRef = this.drawers.get(id);

    if (drawerComponentRef) {
      drawerComponentRef.instance.animationState = `${drawerComponentRef.instance.options.position}_${AnimationEnum.CLOSED}`;
      drawerComponentRef.instance.animationDone.pipe(take(1)).subscribe(() => {
        this.appRef.detachView(drawerComponentRef.hostView);
        drawerComponentRef.destroy();
        this.drawers.delete(id);
        this.updateDrawerState(id, 'remove');
        this.drawerCloseSubject.next({ id, data });
      });
    }
  }

  private updateDrawerState(id: string, data: DrawerRemoteControl): void;
  private updateDrawerState(id: string, data: 'remove'): void;

  private updateDrawerState(
    id: string,
    data: DrawerRemoteControl | 'remove'
  ): void {
    const currentState = this.drawerStatesSubject.getValue();
    if (data === 'remove') {
      currentState.delete(id);
    } else {
      currentState.set(id, data);
    }
    this.drawerStatesSubject.next(currentState);
  }

  private listenForClose(id: string): Observable<any> {
    return this.drawerCloseSubject.asObservable().pipe(
      filter((event) => event.id === id),
      map((event) => event.data),
      take(1)
    );
  }

  public closeAll(): void {
    const drawers = this.drawers;
    drawers.forEach((drawerComponentRef, id) => {
      this.close(id);
    });
  }
}
