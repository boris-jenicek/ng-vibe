import { APP_INITIALIZER, Injector, Provider } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { setupServiceLocator } from '../tools';

export function provideNgVibeServiceLocator(): Provider[] {
  return [
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector) => () => setupServiceLocator(injector),
      deps: [Injector],
      multi: true,
    },
  ];
}
