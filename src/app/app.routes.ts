import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'form',
    loadChildren: () => import('./features/user-form/routes').then(
      (mod) => mod.USER_FORM_ROUTES
    )
  },
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: '**', redirectTo: 'form', pathMatch: 'full' },
];
