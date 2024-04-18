import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerDummyService {
  serviceState = 'Service status message';
  randomID = Math.random().toString(36).substring(2, 12);

  constructor() {
    console.log('LoggerDummy Service created with ID:' + this.randomID);
  }
  consoleLog(log: string) {
    console.log(log);
  }

  printLog(log: string) {
    return log;
  }
}
