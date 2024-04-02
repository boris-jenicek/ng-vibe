import { Provider } from '@angular/core';
import { DialogRemoteControl } from '../models';

export function provideRemoteControl(
  remoteControl: DialogRemoteControl
): Provider[] {
  return [
    {
      provide: DialogRemoteControl,
      useValue: remoteControl,
    },
  ];
}
