import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from '@iqx-limited/ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error) => {
      
      toastr.error('Something went wrong. Please try again.'); //the pop up message 
      console.log('Error caught by interceptor:', error);
      
      // Re-throw the error so components can also handle it if needed
      //throwError CREATES a NEW observable that immediately errors
      // This new error observable flows BACK to your component
      return throwError(() => error);
    }),
  );
};
