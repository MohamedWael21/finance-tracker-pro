// File: auth.guard.ts
// Purpose: Protect routes

// TODO: [Dev1]
// - Check token existence
// - Redirect to login if not authenticated

import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  return !!localStorage.getItem('token');
};
