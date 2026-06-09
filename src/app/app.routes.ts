import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
export const routes: Routes = [
  { path: '', redirectTo: '/in', pathMatch: 'full' },
  {
    path: 'l',
    loadComponent: () =>
      import('./item-list/item-list').then((m) => m.ItemList),
    canActivate: [authGuard],
  },
  {
    path: 'n',
    loadComponent: () =>
      import('./item-create/item-create').then((m) => m.ItemCreate),
    canActivate: [authGuard],
  },
  {
    path: 'in',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found').then((m) => m.NotFound),
  },
];
