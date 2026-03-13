import { Component, OnDestroy, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit, OnDestroy {
  //This is an OUTPUT EVENT, not data from service!, it just announces "someone typed!"
  //"I'll notify parent when user types"
  //It does TWO things:NOTIFY the parent that something happened,SEND DATA along with the notification
  searchTerm = output<string>(); // Just emits what user typed -> output event / doorbell button , notifies taht someone is at the door

  //
  searchControl = new FormControl('');

  private subscription = new Subscription();

  ngOnInit() {

    this.subscription.add(
      //  this.searchControl.valueChanges -> returns an observable that emits every time the user types something.
      this.searchControl.valueChanges
        .pipe(
          debounceTime(300), 
          distinctUntilChanged(),
        )
        .subscribe((value) => {
          this.searchTerm.emit(value || '');
        }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
