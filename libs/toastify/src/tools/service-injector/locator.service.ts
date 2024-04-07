import { Injector } from '@angular/core';

export function setupServiceLocator(injector: Injector): void {
  ServiceLocator.injector = injector;
}
export class ServiceLocator {
  static injector: Injector;
}
