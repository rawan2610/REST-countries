import { Component, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-region-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './region-filter.html',
})
export class RegionFilterComponent implements OnInit {
  //event emitter, -? is like a messenger that carries a message from child to parent.
  // Emit selected region to parent
  ////It does TWO things:NOTIFY the parent that something happened,SEND DATA along with the notification
  //we created it so we can notify the parent component that the user typed or selected something and also sending it the data"
  regionChange = output<string>();
  //manual 3ade
  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  //<!--A FormControl is an Angular class that tracks the value and validation status of a form input.
  //Instead of: (input)="onInput($event)" and [value]="searchTerm()"
  //You do: [formControl]="searchControl" and Angular handles everything!

  regionControl = new FormControl('');

  //Why do we need subscription for FormControl?
  //Because valueChanges returns an Observable that needs subscription:Without subscription → nothing happens when user types!
  
  ngOnInit() {
    this.regionControl.valueChanges.subscribe((value) => {
      //This runs EVERY TIME the input changes
      this.regionChange.emit(value || '');
    });
  }
}
