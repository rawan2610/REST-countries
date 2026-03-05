import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  console.log('Interceptor: Request started -', req.url);
  // Show loading spinner
  loadingService.show();

  return next(req).pipe(
    delay(2000),
    finalize(() => {
      console.log('Interceptor: Request completed -', req.url);
      // Hide loading spinner when request completes (success or error)
      loadingService.hide();
    }),
  );
};
