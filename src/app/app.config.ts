import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from '@iqx-limited/ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), //->// "Make routing available everywhere"
    provideHttpClient(withInterceptors([loadingInterceptor,errorInterceptor])), // //-> this to provide it from the beginning in order to use it in injet()
    //->"Make HttpClient available everywhere"// HTTP client for API calls
    provideAnimations(), // Required for toastr
    provideToastr({
      // Toastr configuration
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
};
