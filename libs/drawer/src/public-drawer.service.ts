import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { DrawerService } from './drawer.service';
import { DrawerRemoteControl } from './models';

@Injectable({
  providedIn: 'root',
})
export class PublicDrawerService {
  private drawerService: DrawerService = inject(DrawerService);

  public getDrawerStates(): Observable<Map<string, DrawerRemoteControl>> {
    return this.drawerService.drawerStates$;
  }

  public getDrawerRemoteControl(id: string): DrawerRemoteControl | undefined {
    const drawerStates = this.drawerService.drawerStatesSubject.getValue();
    return drawerStates.get(id);
  }

  public getDrawerState(
    id: string
  ): Observable<DrawerRemoteControl | undefined> {
    return this.drawerService.drawerStates$.pipe(
      map((states) => states.get(id)),
      filter((state): state is DrawerRemoteControl => state !== undefined)
    );
  }

  public closeAllDrawers(): void {
    this.drawerService.closeAll();
  }
}
