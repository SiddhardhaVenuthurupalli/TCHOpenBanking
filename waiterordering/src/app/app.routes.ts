import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'selectTable',
    loadComponent: () => import('./select-table/select-table.page').then(m => m.SelectTablePage),
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then(m => m.MenuPage),
  },
];
