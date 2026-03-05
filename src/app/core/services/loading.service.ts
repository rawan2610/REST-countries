import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // Public readonly signal for components to use
  isLoading = signal(false);

  // Call this when a request starts
  show() {
    this.isLoading.set(true);
  }

  // Call this when a request ends
  hide() {
    this.isLoading.set(false);
  }

  // Reset loading state (useful for errors)
  reset() {
    this.isLoading.set(false);
  }
}
