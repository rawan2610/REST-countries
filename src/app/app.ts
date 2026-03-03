import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "./loading/loading";
import { LoadingService } from './core/services/loading.service'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('rest-countries');
 
  protected loadingService = inject(LoadingService);
}