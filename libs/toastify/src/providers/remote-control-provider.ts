import { Provider } from '@angular/core';
import { ToastifyRemoteControl } from '../models';

export function provideRemoteControl(
  remoteControl: ToastifyRemoteControl
): Provider[] {
  return [
    {
      provide: ToastifyRemoteControl,
      useValue: remoteControl,
    },
  ];
}
