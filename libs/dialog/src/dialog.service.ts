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
import { DialogComponent } from './dialog.component';
import { DialogRemoteControl } from './models';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private appRef: ApplicationRef = inject(ApplicationRef);
  private environmentInjector = inject(EnvironmentInjector);
  private dialogs = new Map<string, ComponentRef<DialogComponent>>();
  private dialogCloseSubject = new Subject<{ id: string; data: any }>();
  public dialogStatesSubject = new BehaviorSubject<
    Map<string, DialogRemoteControl>
  >(new Map());
  public dialogStates$ = this.dialogStatesSubject.asObservable();

  public open(
    dialogRemoteControl: DialogRemoteControl,
    component: Type<any>,
    loaderComponent?: Type<any>
  ): Observable<any> {
    if (this.dialogs.has(dialogRemoteControl.id)) {
      return this.listenForClose(dialogRemoteControl.id);
    }

    const dialogComponentRef = this.createAndConfigureDialog(
      dialogRemoteControl,
      component,
      loaderComponent
    );

    this.addAndDisplayDialog(dialogRemoteControl.id, dialogComponentRef);

    return this.listenForClose(dialogRemoteControl.id);
  }

  private createAndConfigureDialog(
    dialogRemoteControl: DialogRemoteControl,
    component: Type<any>,
    loaderComponent?: Type<any>
  ): ComponentRef<DialogComponent> {
    const dialogComponentRef = createComponent(DialogComponent, {
      environmentInjector: this.environmentInjector,
    });

    if (loaderComponent) {
      dialogComponentRef.instance.setLoaderComponent(loaderComponent);
    }

    dialogComponentRef.instance.prepareComponentForLoad(
      component,
      dialogRemoteControl
    );

    dialogComponentRef.instance.options = dialogRemoteControl.options;

    return dialogComponentRef;
  }

  private addAndDisplayDialog(
    id: string,
    dialogComponentRef: ComponentRef<DialogComponent>
  ): void {
    this.dialogs.set(id, dialogComponentRef);
    this.updateDialogState(id, dialogComponentRef.instance.dialogRemoteControl);

    this.appRef.attachView(dialogComponentRef.hostView);
    document.body.appendChild(dialogComponentRef.location.nativeElement);
  }

  public removeLoaderComponent(id: string): void {
    const dialogComponentRef = this.dialogs.get(id);
    if (dialogComponentRef) {
      dialogComponentRef.instance.stopLoader();
    }
  }
  public close(id: string, data?: any): void {
    const dialogComponentRef = this.dialogs.get(id);

    if (dialogComponentRef) {
      dialogComponentRef.instance.overlayAnimationState = 'leave';
      dialogComponentRef.instance.boxAnimationState =
        dialogComponentRef.instance.options.animationOut!;
      dialogComponentRef.instance.animationDone.pipe(take(1)).subscribe(() => {
        this.appRef.detachView(dialogComponentRef.hostView);
        dialogComponentRef.destroy();
        this.dialogs.delete(id);
        this.updateDialogState(id, 'remove');
        this.dialogCloseSubject.next({ id, data });
      });
    }
  }

  private updateDialogState(id: string, data: DialogRemoteControl): void;
  private updateDialogState(id: string, data: 'remove'): void;

  private updateDialogState(
    id: string,
    data: DialogRemoteControl | 'remove'
  ): void {
    const currentState = this.dialogStatesSubject.getValue();
    if (data === 'remove') {
      currentState.delete(id);
    } else {
      currentState.set(id, data);
    }
    this.dialogStatesSubject.next(currentState);
  }

  private listenForClose(id: string): Observable<any> {
    return this.dialogCloseSubject.asObservable().pipe(
      filter((event) => event.id === id),
      map((event) => event.data),
      take(1)
    );
  }

  public closeAll(): void {
    const drawers = this.dialogs;
    drawers.forEach((drawerComponentRef, id) => {
      this.close(id);
    });
  }
}
