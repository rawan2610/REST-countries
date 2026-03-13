import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "./loading/loading";
import { LoadingService } from './core/services/loading-controlling-spinner.service'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('rest-countries');
 
  protected loadingService = inject(LoadingService);

}