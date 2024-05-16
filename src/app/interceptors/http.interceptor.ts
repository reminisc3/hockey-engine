import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingService = inject(LoadingService);

  loadingService.show();

  return next(req).pipe(finalize(() => {
    loadingService.hide();
  }));
  
};
