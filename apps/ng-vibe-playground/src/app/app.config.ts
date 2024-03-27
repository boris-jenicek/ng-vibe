import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgVibeDrawer } from '@ng-vibe/drawer';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideNgVibeDrawer()],
};
