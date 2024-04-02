import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { DialogRemoteControl } from '../models';
import { DialogService } from './dialog.service';
import { StateManagementService } from './state-management.service';

type RemoteControlType = DialogRemoteControl;
@Injectable({
  providedIn: 'root',
})
export class PublicDialogService {
  private service: DialogService = inject(DialogService);
  private state = inject(StateManagementService);

  /**
   * An Observable that emits the count of active dialogues by listening to the state changes
   * and calculates the total amount active dialogues.
   */
  public activeDialogsCount$: Observable<number> =
    this.state.instanceStates$.pipe(
      map((states) => Array.from(states.values()).length)
    );

  /**
   * Retrieves the DialogRemoteControl object associated with a specific dialogue ID.
   * @param {string} id The unique identifier for the dialogue.
   * @returns {DialogRemoteControl | undefined} The DialogRemoteControl object if found, otherwise undefined.
   */
  public getRemoteControl(id: string): RemoteControlType | undefined {
    return this.state.instanceStatesSubject.getValue().get(id);
  }

  /**
   * Returns an Observable that emits the DialogRemoteControl object for a given dialogue ID.
   * The Observable filters out any undefined states, ensuring subscribers only receive defined DialogRemoteControl objects.
   * @param {string} id The unique identifier for the dialogue.
   * @returns {Observable<DialogRemoteControl | undefined>} An Observable emitting the DialogRemoteControl object or undefined.
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
   * Triggers the closing of all dialogs.
   */
  public closeAll(): void {
    this.service.closeAll();
  }
}
