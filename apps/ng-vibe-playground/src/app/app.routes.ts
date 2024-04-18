import { Route } from '@angular/router';
import { PlaygroundColorComponent } from './pages/playground-color/playground-color.component';
import { PlaygroundDialogComponent } from './pages/playground-dialog/playground-dialog.component';
import { PlaygroundDrawerComponent } from './pages/playground-drawer/playground-drawer.component';
import { PlaygroundServiceLocatorComponent } from './pages/playground-service-locator/playground-service-locator.component';
import { PlaygroundTimerComponent } from './pages/playground-timer/playground-timer.component';
import { PlaygroundToastifyComponent } from './pages/playground-toastify/playground-toastify.component';

export const appRoutes: Route[] = [
  {
    path: 'drawer',
    component: PlaygroundDrawerComponent,
    children: [],
  },
  {
    path: 'dialog',
    component: PlaygroundDialogComponent,
    children: [],
  },
  {
    path: 'toastify',
    component: PlaygroundToastifyComponent,
    children: [],
  },
  {
    path: 'timer',
    component: PlaygroundTimerComponent,
    children: [],
  },
  {
    path: 'color',
    component: PlaygroundColorComponent,
    children: [],
  },
  {
    path: 'service-locator',
    component: PlaygroundServiceLocatorComponent,
    children: [],
  },
];
