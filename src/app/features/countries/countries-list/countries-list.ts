import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CountriesApiService } from '../../../core/services/countries-api.service';
import { Country } from '../../../core/models/country';
//import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastrService } from '@iqx-limited/ngx-toastr';

@Component({
  selector: 'app-countries-list',
  imports: [DecimalPipe],
  templateUrl: './countries-list.html',
  styleUrl: './countries-list.scss',
  standalone: true,
})

//this is the main component that will show the list of countries
export class CountriesList implements OnInit, OnDestroy {
  //It gives your component access to the CountriesApiService so you can use its methods (like getAllCountries()).
  private countriesApi: CountriesApiService = inject(CountriesApiService);

  countries = signal<Country[]>([]);
  dataLoading = signal(true);
  error = signal('');
  private subscriptions = new Subscription();

  private toastr: ToastrService = inject(ToastrService);

  ngOnInit() {
    this.fetchCountries();
  }

  private fetchCountries() {
    // Store the subscription in a variable
    const countriesSubscription = this.countriesApi.getAllCountries().subscribe({
      next: (data) => {
        this.countries.set(data);
        this.dataLoading.set(false);
        this.toastr.success('Countries loaded successfully!');
        console.log('Countries loaded:', data);
      },
      error: (err) => {
        this.error.set('Failed to load countries. Please try again later.'); //constant error on screen
        this.dataLoading.set(false);
        console.error('Error details:', err);
      },
    });

    // Add the subscription to the collection
    this.subscriptions.add(countriesSubscription);
  }


  ngOnDestroy() {
    // This unsubscribes from ALL subscriptions in the collection at once
    this.subscriptions.unsubscribe();
    console.log('All subscriptions cleaned up');
  }
}
