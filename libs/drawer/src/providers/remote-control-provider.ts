import { Provider } from '@angular/core';
import { DrawerRemoteControl } from '../models';

export function provideRemoteControl(
  remoteControl: DrawerRemoteControl
): Provider[] {
  return [
    {
      provide: DrawerRemoteControl,
      useValue: remoteControl,
    },
  ];
}
