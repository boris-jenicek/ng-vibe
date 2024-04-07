import { inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ToastComponent } from '../components';
import { ToastifyRemoteControl } from '../models';
import { DomService } from './dom.service';
import { HelperService } from './helper.service';
import { QueueService } from './queue.service';
import { StateManagementService } from './state-management.service';
import { ToastConfigService } from './toast-config.service';

type RemoteControlType = ToastifyRemoteControl;
type ParentComponentType = ToastComponent;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private helperService = inject(HelperService);
  private domService = inject(DomService);
  private stateService = inject(StateManagementService);
  private config = inject(ToastConfigService);
  private queueService = inject(QueueService);
  public open(remoteControl: RemoteControlType): Observable<any> {
    if (this.stateService.instanceExists(remoteControl.id)) {
      return this.stateService.listenForClose(remoteControl.id);
    }
    this.setupTimer(remoteControl);

    if (this.queueService.activeCount() < this.config.maximumToasts) {
      this.processToastDisplay(remoteControl);
    } else {
      this.queueService.enqueue(remoteControl);
    }

    return this.stateService.listenForClose(remoteControl.id);
  }

  private setupTimer(remoteControl: RemoteControlType): void {
    if (remoteControl.options.autoCloseDuration) {
      remoteControl.getTimer().start();
      remoteControl.getTimer().onTimeout = () => remoteControl.closeToast();
    }
  }

  private processToastDisplay(remoteControl: RemoteControlType): void {
    const parentComponentRef =
      this.helperService.createAndConfigureToastify<ParentComponentType>(
        remoteControl,
        ToastComponent
      );

    this.stateService.addInstance(parentComponentRef, remoteControl);
    this.domService.manageView(
      'attach',
      parentComponentRef,
      remoteControl.options.position
    );
    this.queueService.markActive(remoteControl);
  }

  private processNextToast(): void {
    const nextToast = this.queueService.dequeue();
    if (nextToast) {
      this.processToastDisplay(nextToast);
    }
  }

  public close(id: string, data?: any): void {
    const parentRef = this.stateService.getInstance(id);
    if (parentRef) {
      parentRef.instance.contentAnimationState = 'leave';
      parentRef.instance.boxAnimationState =
        parentRef.instance.rc.options.animationOut;

      parentRef.instance.animationDone.pipe(take(1)).subscribe(() => {
        this.stateService.closeEmmit(id, data);
        this.queueService.removeActive(id);
        parentRef.instance.rc.getTimer().stop();
        this.processNextToast();
        this.domService.manageView(
          'detach',
          parentRef,
          parentRef.instance.rc.options.position
        );
      });
    }
  }

  public closeAll(): void {
    this.queueService.clearQueue();
    this.stateService.instances.forEach((drawerComponentRef, id) => {
      this.close(id);
    });
  }
}
