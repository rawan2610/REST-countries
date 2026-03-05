import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from '@iqx-limited/ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error) => {
      // Default error message
      let errorMessage = 'Something went wrong. Please try again.';
      
      // Check if it's an HTTP error response
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 404:
            errorMessage = 'Resource not found (404). Please check the URL.';
            break;
          case 500:
            errorMessage = 'Server error (500). Please try again later.';
            break;
          case 0:
            errorMessage = 'Network error. Please check your internet connection.';
            break;
          default:
            errorMessage = `Error ${error.status}: ${error.statusText || 'Unknown error'}`;
        }
      }

      // Show the dynamic error message
      toastr.error(errorMessage); //the pop up message 
      console.log('Error caught by interceptor:', error);

      // Re-throw the error so components can also handle it if needed
      //throwError CREATES a NEW observable that immediately errors
      // This new error observable flows BACK to your component
      return throwError(() => error);
    }),
  );
};
