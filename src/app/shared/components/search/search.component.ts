import { Component, output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
})

export class SearchComponent {
  searchTerm = output<string>();  // Just emits what user typed
  
  onInput(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    console.log('1. SearchComponent emitting:', term);
    this.searchTerm.emit(term);  // Send term to parent -> country list 
  }
}