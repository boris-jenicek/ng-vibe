import { DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, Injector, Provider } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IToastifyProviderOptions } from '../interfaces';
import { ToastConfigService } from '../services/toast-config.service';
import { setupServiceLocator } from '../tools';
import { setupToastContainer } from './toast-container-provider';

export function provideNgVibeToastify(
  options: IToastifyProviderOptions = {}
): Provider[] {
  return [
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector, config: ToastConfigService) => () => {
        setupServiceLocator(injector);
        if (options.maximumToasts !== undefined) {
          config.maximumToasts = options.maximumToasts;
        }
      },
      deps: [Injector],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (document: Document) => setupToastContainer(document),
      deps: [DOCUMENT],
      multi: true,
    },
  ];
}
