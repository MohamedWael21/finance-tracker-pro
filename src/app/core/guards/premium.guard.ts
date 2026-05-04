import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';

export const premiumGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.plan() === 'premium';
};
