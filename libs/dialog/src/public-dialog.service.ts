import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { DialogService } from './dialog.service';
import { DialogRemoteControl } from './models';

@Injectable({
  providedIn: 'root',
})
export class PublicDialogService {
  private dialogService: DialogService = inject(DialogService);

  public getDialogStates(): Observable<Map<string, DialogRemoteControl>> {
    return this.dialogService.dialogStates$;
  }

  public getDialogRemoteControl(id: string): DialogRemoteControl | undefined {
    const dialogStates = this.dialogService.dialogStatesSubject.getValue();
    return dialogStates.get(id);
  }

  public getDialogState(
    id: string
  ): Observable<DialogRemoteControl | undefined> {
    return this.dialogService.dialogStates$.pipe(
      map((states) => states.get(id)),
      filter((state): state is DialogRemoteControl => state !== undefined)
    );
  }

  public closeAllDialogs(): void {
    this.dialogService.closeAll();
  }
}
