import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgVibeDialog } from '@ng-vibe/dialog';
import { provideNgVibeDrawer } from '@ng-vibe/drawer';
import { provideNgVibeToastify } from '@ng-vibe/toastify';
import { ColorPickerModule } from 'ngx-color-picker';
import { provideNgVibeServiceLocator } from '@ng-vibe/service-locator';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideNgVibeDrawer(),
    provideNgVibeDialog(),
    provideNgVibeToastify(),
    provideNgVibeServiceLocator(),
    importProvidersFrom(ColorPickerModule),
  ],
};
