import { inject, Injectable, Type } from '@angular/core';
import { Observable, take } from 'rxjs';
import { DrawerComponent } from '../components';
import { AnimationEnum } from '../enums';
import { DrawerRemoteControl } from '../models';
import { HelperService } from './helper.service';
import { StateManagementService } from './state-management.service';

type RemoteControlType = DrawerRemoteControl;
type ParentComponentType = DrawerComponent;

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
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
    console.log('loaderComponent', loaderComponent);
    const parentComponentRef =
      this.helperService.createAndConfigureDynamicComponents<
        ParentComponentType,
        RemoteControlType
      >(remoteControl, childComponent, DrawerComponent, loaderComponent);
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
      parentRef.instance.animationState = `${parentRef.instance.options.position}_${AnimationEnum.CLOSED}`;
      parentRef.instance.contentAnimationState = 'leave';
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
