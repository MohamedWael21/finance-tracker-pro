// File: premium.guard.ts
// Purpose: Restrict premium routes

// TODO: [Dev5]
// - Check user subscription

import { CanActivateFn } from '@angular/router';

export const premiumGuard: CanActivateFn = () => {
  return true;
};
