import { inject, Injectable, Type } from '@angular/core';
import { Observable, take } from 'rxjs';
import { DialogComponent } from '../components';
import { DialogRemoteControl } from '../models';
import { HelperService } from './helper.service';
import { StateManagementService } from './state-management.service';

type RemoteControlType = DialogRemoteControl;
type ParentComponentType = DialogComponent;

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private helperService = inject(HelperService);
  private stateService = inject(StateManagementService);

  public open(
    remoteControl: RemoteControlType,
    childComponent: Type<any>,
    loaderComponent?: Type<any>
  ): Observable<any> {
    if (this.stateService.instanceExists(remoteControl.id)) {
      return this.stateService.listenForClose(remoteControl.id);
    }

    const parentComponentRef =
      this.helperService.createAndConfigureDynamicComponents<
        ParentComponentType,
        RemoteControlType
      >(remoteControl, childComponent, DialogComponent, loaderComponent);

    this.stateService.addInstance(
      remoteControl.id,
      parentComponentRef,
      remoteControl
    );

    this.helperService.manageView('attach', parentComponentRef);
    return this.stateService.listenForClose(remoteControl.id);
  }

  public removeLoaderComponent(id: string): void {
    const dialogComponentRef = this.stateService.getInstance(id);
    if (dialogComponentRef) {
      dialogComponentRef.instance.stopLoader();
    }
  }
  public close(id: string, data?: any): void {
    const parentRef = this.stateService.getInstance(id);
    if (parentRef) {
      parentRef.instance.overlayAnimationState = 'leave';
      parentRef.instance.boxAnimationState =
        parentRef.instance.options.animationOut;

      parentRef.instance.animationDone.pipe(take(1)).subscribe(() => {
        this.helperService.manageView('detach', parentRef);
        this.stateService.closeEmmit(id, data);
      });
    }
  }

  public closeAll(): void {
    const dialogs = this.stateService.instances;

    dialogs.forEach((drawerComponentRef, id) => {
      this.close(id);
    });
  }
}
