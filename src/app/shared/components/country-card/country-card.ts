import { Component, input } from '@angular/core';
import { Country } from '../../../core/models/country';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-card',
  standalone:true,
  imports: [DecimalPipe],
  templateUrl: './country-card.html',
})
export class CountryCard {
//Think of this as creating a door where parent components can pass in a country
//Parent Component → [country] → Country Card Component
//The parent component is whatever component USES <app-country-card> and passes data to it.
//<Country> -> this means the data that comes in MUST be a Country object,it sends data , and this child receive it
//the line below : Child can RECEIVE data through this line from any parent that uses its selector tag in their html file
country = input.required<Country>(); //input()	Function that CREATES a signal, country is a SIGNAL
}

