import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authRequestInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/auth')||req.url.includes('/redirect')) {
    return next(req);
  }

  const userId = inject(AuthService).userid;

  const modfiedReq = req.clone({
    setHeaders: {
      'X-user-id': userId,
    },
  });

  return next(modfiedReq);
};
