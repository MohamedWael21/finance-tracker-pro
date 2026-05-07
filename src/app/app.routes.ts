// File: app.routes.ts
// Purpose: Application routing

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { premiumGuard } from './core/guards/premium.guard';
import { RootLayout } from './shared/components/layout/root-layout/root-layout';
import { AuthLayout } from './shared/components/layout/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: 'reset-password',
    component: AuthLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/auth/reset-password/reset-password').then((m) => m.ResetPassword),
      }
    ]
  },
  {
    path: '',
    component: RootLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        canActivate: [authGuard],
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/reports/reports.component').then((m) => m.ReportsComponent),
        canActivate: [authGuard, premiumGuard],
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then((m) => m.ProfileComponent),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./features/auth/forgot-password/forgot-password').then((m) => m.ForgotPassword),
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./features/auth/reset-password/reset-password').then((m) => m.ResetPassword),
      },
      {
        path: 'reset-password-confirm/:token',
        loadComponent: () => import('./features/auth/reset-password/reset-password').then((m) => m.ResetPassword),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
