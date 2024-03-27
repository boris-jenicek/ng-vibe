import { Route } from '@angular/router';
import { DrawerComponent } from './pages/drawer.component';

export const appRoutes: Route[] = [
  {
    path: 'drawer',
    component: DrawerComponent,
    children: [],
  },
];
