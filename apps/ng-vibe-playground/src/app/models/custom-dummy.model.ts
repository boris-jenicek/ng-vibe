import { ServiceLocator } from '@ng-vibe/service-locator';
import { LoggerDummyService } from '../services/logger-dummy.service';

export class CustomClass {
  constructor() {
    const loggerSingleton = ServiceLocator.getInstance(LoggerDummyService);
    const loggerNewInstance = ServiceLocator.createService(LoggerDummyService);
  }
}
