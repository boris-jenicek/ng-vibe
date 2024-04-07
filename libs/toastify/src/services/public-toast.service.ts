import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { ToastifyRemoteControl } from '../models';
import { QueueService } from './queue.service';
import { StateManagementService } from './state-management.service';
import { ToastService } from './toast.service';

type RemoteControlType = ToastifyRemoteControl;
@Injectable({
  providedIn: 'root',
})
export class PublicToastService {
  private service: ToastService = inject(ToastService);
  private queueService: QueueService = inject(QueueService);
  private state = inject(StateManagementService);

  /**
   * An Observable that emits the count of active toasts by listening to the state changes
   * and calculates the total number of active toasts.
   */
  public activeToastCount$: Observable<number> =
    this.state.instanceStates$.pipe(
      map((states) => Array.from(states.values()).length)
    );

  /**
   * Retrieves the ToastRemoteControl object associated with a specific toast ID.
   * @param {string} id The unique identifier for the toast.
   * @returns {ToastRemoteControl | undefined} The ToastRemoteControl object if found, otherwise undefined.
   */
  public getRemoteControl(id: string): RemoteControlType | undefined {
    return this.state.instanceStatesSubject.getValue().get(id);
  }

  /**
   * Returns an Observable that emits the ToastRemoteControl object for a given toast ID.
   * The Observable filters out any undefined states, ensuring subscribers only receive defined ToastRemoteControl objects.
   * @param {string} id The unique identifier for the toast.
   * @returns {Observable<ToastRemoteControl | undefined>} An Observable emitting the ToastRemoteControl object or undefined.
   */
  public selectRemoteControl$(
    id: string
  ): Observable<RemoteControlType | undefined> {
    return this.state.instanceStates$.pipe(
      map((states) => states.get(id)),
      filter((state): state is RemoteControlType => state !== undefined)
    );
  }

  /**
   * Triggers the closing of all toasts.
   */
  public closeAll(): void {
    this.service.closeAll();
  }

  /**
   * Retrieves the length of the toast queue.
   */
  public getQueueLength(): void {
    this.queueService.getQueueLength();
  }
}
