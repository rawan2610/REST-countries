import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // Public readonly signal for components to use
  //signal changes->Angular immediately updates the template, no subscription neededs,, signal like a live variable connected to the UI.
  isLoading = signal(false);

  // Call this when a request starts
  show() {
    this.isLoading.set(true);
  }

  // Call this when a request ends/api rga3 response
  hide() {
    this.isLoading.set(false);
  }

  // Reset loading state (useful for errors)
  reset() {
    this.isLoading.set(false);
  }
}
