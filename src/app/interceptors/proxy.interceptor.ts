import { HttpInterceptorFn } from '@angular/common/http';

export const proxyInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
