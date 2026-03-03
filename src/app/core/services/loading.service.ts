import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // Signal to track loading state
  private loadingCount = signal(0);
  
  // Public readonly signal for components to use
  isLoading = signal(false);

  constructor() { /* empty */ }

  // Call this when a request starts
  show() {
    this.loadingCount.update(count => count + 1);
    this.isLoading.set(true);
  }

  // Call this when a request ends
  hide() {
    this.loadingCount.update(count => Math.max(count - 1, 0));
    if (this.loadingCount() === 0) {
      this.isLoading.set(false);
    }
  }

  // Reset loading state (useful for errors)
  reset() {
    this.loadingCount.set(0);
    this.isLoading.set(false);
  }
}