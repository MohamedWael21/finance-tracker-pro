import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = authService.isLoggedIn();
  if (token) {
    return true;
  }
  else{
    router.navigate(['/auth/login']);
    return false;
  }
};
