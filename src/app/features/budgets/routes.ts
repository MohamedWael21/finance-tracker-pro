import { Routes } from '@angular/router';

export const BUDGET_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./budget-list/budget-list').then(m => m.BudgetList)
  }
];
