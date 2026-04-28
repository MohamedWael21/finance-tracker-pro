// File: app.routes.ts
// Purpose: Application routing

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { premiumGuard } from './core/guards/premium.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./features/reports/reports.component').then(m => m.ReportsComponent),
    canActivate: [authGuard, premiumGuard]
  }
];
