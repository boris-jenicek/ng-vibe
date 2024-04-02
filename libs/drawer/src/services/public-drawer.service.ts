import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { DrawerRemoteControl } from '../models';
import { DrawerService } from './drawer.service';
import { StateManagementService } from './state-management.service';

type RemoteControlType = DrawerRemoteControl;

@Injectable({
  providedIn: 'root',
})
export class PublicDrawerService {
  private service: DrawerService = inject(DrawerService);
  private state = inject(StateManagementService);

  /**
   * An Observable that emits the count of active drawers by listening to the state changes
   * and calculates the total amount active drawers.
   */
  public activeDrawersCount$: Observable<number> =
    this.state.instanceStates$.pipe(
      map((states) => Array.from(states.values()).length)
    );

  /**
   * Retrieves the RemoteControl object associated with a specific drawer ID.
   * @param {string} id The unique identifier for the drawer.
   * @returns {DrawerRemoteControl | undefined} The RemoteControl object if found, otherwise undefined.
   */
  public getRemoteControl(id: string): RemoteControlType | undefined {
    return this.state.instanceStatesSubject.getValue().get(id);
  }

  /**
   * Returns an Observable that emits the RemoteControl object for a given drawer ID.
   * The Observable filters out any undefined states, ensuring subscribers only receive defined RemoteControl objects.
   * @param {string} id The unique identifier for the drawer.
   * @returns {Observable<DrawerRemoteControl | undefined>} An Observable emitting the RemoteControl object or undefined.
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
   * Triggers the closing of all drawers.
   */
  public closeAll(): void {
    this.service.closeAll();
  }
}
