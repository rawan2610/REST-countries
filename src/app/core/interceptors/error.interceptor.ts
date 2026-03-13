import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from '@iqx-limited/ngx-toastr';

// Dynamic message = Message that changes based on the situation (like showing "404 error" for missing page, "network error" for no internet).
// Normal message = Always the same message no matter what error happens.

//error.error instanceof ErrorEvent -> Checking if the error happened in the browser (client-side) or not.

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error) => {
      // Default error message
      let errorMessage = 'Something went wrong. Please try again.';

      // Check if it's an HTTP error response
      if (error.error instanceof ErrorEvent) {

        // lw el status =0 , Client-side error
        //Status 0 typically means the request couldn't reach the server
        //Common causes: No internet, CORS issues, server down

        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        // Server-side error, different status
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
      toastr.error(errorMessage); //El pop up message ely htzhar 3l screen

      // Re-throw the error so components can also handle it if needed
      //throwError CREATES a NEW observable that immediately errors
      // This new error observable flows BACK to your component
      return throwError(() => error);
    }),
  );
};


//if (error.error instanceof ErrorEvent) {
  // Client-side error
//}

//What the error object looks like for client error:

// javascript
// {
//   error: ErrorEvent { 
//     message: "Failed to fetch", 
//     filename: "https://myapp.com/main.js",
//     lineno: 123 
//   },
//   status: 0,  // Note: status is 0, not a real HTTP status
//   statusText: "Unknown Error"
// }