import { Route } from '@angular/router';
import { PlaygroundDialogComponent } from './pages/playground-dialog/playground-dialog.component';
import { PlaygroundDrawerComponent } from './pages/playground-drawer/playground-drawer.component';
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
];
