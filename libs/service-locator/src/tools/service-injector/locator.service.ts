import { Injector, Type } from '@angular/core';

export function setupServiceLocator(injector: Injector): void {
  ServiceLocator.injector = injector;
}
export class ServiceLocator {
  static injector: Injector;

  static getInstance<T>(serviceType: Type<T>): T {
    return ServiceLocator.injector.get(serviceType);
  }

  static createService<T>(serviceType: Type<T>): T {
    const childInjector = Injector.create({
      providers: [{ provide: serviceType, useClass: serviceType }],
      parent: ServiceLocator.injector,
    });
    return childInjector.get(serviceType);
  }
}
