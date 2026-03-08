import { Component, inject, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CountriesApiService } from '../../../core/services/countries-api.service';
import { Country } from '../../../core/models/country';
//import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastrService } from '@iqx-limited/ngx-toastr';
import { CountryCard } from '../../../shared/components/country-card/country-card';
import { SearchComponent } from '../../../shared/components/search/search.component';

@Component({
  selector: 'app-countries-list',
  imports: [DecimalPipe, CountryCard, SearchComponent],
  templateUrl: './countries-list.html',
  standalone: true,
})

//this is the main component that will show the list of countries
export class CountriesList implements OnInit, OnDestroy {
  //It gives your component access to the CountriesApiService so you can use its methods (like getAllCountries()).
  private countriesApi: CountriesApiService = inject(CountriesApiService);

  countries = signal<Country[]>([]); //-> Empty array initially, da ely hn7ot feeh el countries ely gaylna mn el response mn el server

  //dataLoading = signal(true); //->loading state
  error = signal(''); //-> error state
  private subscriptions = new Subscription();

  searchTerm = signal('');

  private toastr: ToastrService = inject(ToastrService);

  ngOnInit() {
    this.fetchCountries();
  }

  private fetchCountries() {
    // Store the subscription in a variable
    const countriesSubscription = this.countriesApi.getAllCountries().subscribe({
      next: (data) => {
        this.countries.set(data); // ← DATA COMES FROM API HERE , Source: The data comes from the REST Countries API via HTTP request.
        // Now parent has the data

        this.toastr.success('Countries loaded successfully!');
        console.log('Countries loaded:', data);
      },
      error: (err) => {
        this.error.set('Failed to load countries. Please try again later.'); //constant error on screen

        console.error('Error details:', err);
      },
    });

    // Add the subscription to the collection
    this.subscriptions.add(countriesSubscription);
  }

  filteredCountries = computed(() => {
    // Get search term from service
    const serviceTerm = this.countriesApi.getSearchTerm()().toLowerCase().trim();
    const data = this.countries();
    console.log('5. Computing filtered. Term:', serviceTerm, 'Data length:', data.length); 

    if (!serviceTerm) return data;

    return data.filter((country) => country.name.common.toLowerCase().includes(serviceTerm));
  });
  // In countries-list.ts
  onSearchInput(term: string): void {
    console.log('2. CountriesList received:', term); // ADD THIS
    this.searchTerm.set(term);
    this.countriesApi.search(term);
  }

  ngOnDestroy() {
    // This unsubscribes from ALL subscriptions in the collection at once
    this.subscriptions.unsubscribe();
    console.log('All subscriptions cleaned up');
  }
}
