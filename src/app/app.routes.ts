import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { premiumGuard } from './core/guards/premium.guard';
import { RootLayout } from './shared/components/layout/root-layout/root-layout';
import { AuthLayout } from './shared/components/layout/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: '',
    component: RootLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
        canActivate: [authGuard],
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/reports/reports').then((m) => m.Reports),
        canActivate: [authGuard, premiumGuard],
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then((m) => m.ProfileComponent),
        canActivate: [authGuard],
      },
      {
        path: 'pricing',
        loadComponent: () =>
          import('./features/payments/plans/plans').then((m) => m.Plans),
        canActivate: [authGuard],
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./features/notifications/notification-center/notification-center').then(
            (m) => m.NotificationCenter,
          ),
        canActivate: [authGuard],
      },
      {
        path: 'categories',
        loadChildren: () => import('./features/categories/routes').then((m) => m.CATEGORY_ROUTES),
        canActivate: [authGuard],
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./features/transactions/routes').then((m) => m.TRANSACTION_ROUTES),
        canActivate: [authGuard],
      },
      {
        path: 'budgets',
        loadChildren: () => import('./features/budgets/routes').then((m) => m.BUDGET_ROUTES),
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
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
