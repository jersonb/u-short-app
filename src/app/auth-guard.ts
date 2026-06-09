import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (inject(AuthService).isAuthorized()) {
    return true;
  }

  router.navigateByUrl('in');

  return false;
};
