import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading-controlling-spinner.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Show loading spinner
  loadingService.show();


  return next(req).pipe(
    delay(500),
    //finalize() runs when the observable completes , even if : Request succeeded/failed/cancelled
    finalize(() => {
      // Hide loading spinner when request completes (success or error)
      loadingService.hide();
    }),
  );
};
