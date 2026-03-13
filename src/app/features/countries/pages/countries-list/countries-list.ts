import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CountriesApiService } from '../../../../core/services/countries-api.service';
import { Country } from '../../../../core/models/country';
import { Subscription } from 'rxjs';
import { ToastrService } from '@iqx-limited/ngx-toastr';
import { CountryCard } from '../../components/country-card/country-card';
import { SearchComponent } from '../../components/search/search.component';
import { RegionFilterComponent } from '../../components/region-filter/region-filter';
import { LoadingService } from '../../../../core/services/loading-controlling-spinner.service';
import { ToggleTheme } from '../../../../toggle-theme/toggle-theme';
import { ThemeService } from '../../../../core/services/theme.service';


@Component({
  selector: 'app-countries-list',
  imports: [CountryCard, SearchComponent, RegionFilterComponent,ToggleTheme],
  templateUrl: './countries-list.html',
  standalone: true,
})

//this is the main component that will show the list of countries
export class CountriesList implements OnInit, OnDestroy {
  //It gives your component access to the CountriesApiService so you can use its methods (like getAllCountries()).
  private countriesApi: CountriesApiService = inject(CountriesApiService);
 public themeService: ThemeService = inject(ThemeService);
  public loadingService: LoadingService = inject(LoadingService);

  countries = signal<Country[]>([]); //-> Empty array initially, da ely hn7ot feeh el countries ely gaylna mn el response mn el server
  //rage3ly mn getall countries/api call
  private subscriptions = new Subscription();

  //we already have searchterm in api service , better in service not component so we can use it globally anywhere in other components
  //searchTerm = signal('');

  private toastr: ToastrService = inject(ToastrService);

  ngOnInit() {
    this.fetchCountries();
  }

  private fetchCountries() {
    // Store the subscription in a variable
    //THIS LINE subscribes to the Observable
    //.subscribe(), you create a Subscription - like opening a connection that stays open until you close it.
    //Always add subscriptions to the collection to prevent memory leaks!
    const countriesSubscription = this.countriesApi.getAllCountries().subscribe({
      next: (data) => {
        this.countries.set(data); // ← DATA COMES FROM API HERE , Source: The data comes from the REST Countries API via HTTP request.
        // Now parent has the data

        this.toastr.success('Countries loaded successfully!');
      },

      //error: -> callback function name in the subscriber object
      //() => { ... } --> arrow function with no parameters , () means it doesn't need any data from the error
      //this.toastr.error(...) --> Calls the toastr service to show a red error message popup ,, this.toastr is the injected service ,,, .error() is the method that shows error styling
      //this runs when:No internet connection, API server is down, error404,...
      //error callback is triggered automatically when something goes wrong with the Observable
      error: () => {
        this.toastr.error('Failed to load countries. Please try again later.');
      },
    });

    // Add the subscription to the collection
    this.subscriptions.add(countriesSubscription);
  }
  onSearch(term: string) {
    if (!term || term.trim() === '') {
      // If search is empty, load all countries
      this.fetchCountries(); // This already adds to subscriptions
    } else {
      // Call search API
      const searchSub = this.countriesApi.searchByName(term).subscribe({
        next: (data) => {
          this.countries.set(data);
          if (data.length === 0) {
            this.toastr.info('No countries found matching your search');
          }
        },
        error: () => {
          this.toastr.error('Search failed');
        },
      });

      // Add to subscriptions!
      this.subscriptions.add(searchSub);
    }
  }

  onRegionChange(region: string) {
    if (!region) {
      this.fetchCountries(); // Already adds to subscriptions
    } else {
      // Call region API
      const regionSub = this.countriesApi.getByRegion(region).subscribe({
        next: (data) => {
          this.countries.set(data);
        },
        error: () => {
          this.toastr.error('Failed to load region');
        },
      });

      //Add to subscriptions!
      this.subscriptions.add(regionSub);
    }
  }







  //computed signal function automatically re-runs whenever any signal 'inside it' changes , like : User types → serviceTerm changes,User selects region → selectedRegion changes,New data loads → countries() changes
  // filteredCountries = computed(() => {

  //   // Get search term from service -> what user type in search box
  //   //this.countriesApi.getSearchTerm() ---> returns the searchTerm signal
  //   //() --> reads the CURRENT value of that signal (like "egypt") or empty
  //   //.trim -> removes spaces
  //   const serviceTerm = this.countriesApi.getSearchTerm()().toLowerCase().trim();

  //   //get selected region from service
  //   const selectedRegion = this.countriesApi.getSelectedRegion()();

  //   //gets/fetches all countries from our database
  //   const data = this.countries();

  //   console.log(
  //     '5. Computing filtered. Term:',
  //     serviceTerm,
  //     'Region:',
  //     selectedRegion,
  //     //how many countries do we have originally
  //     'Data length:',
  //     data.length,
  //   );

  //   // Start with all data, All countries, then we'll remove ones that don't match
  //   let filtered = data;

  //   // Apply region filter FIRST (if any)
  //   if (selectedRegion) {

  //     //filtered.filter(...) → goes through each country/extract each
  //     //country.region === selectedRegion → keeps only if region matches

  //     filtered = filtered.filter((country) => country.region === selectedRegion);
  //     console.log('   After region filter:', filtered.length);
  //   }

  //   // Apply search filter SECOND (if any)
  //   if (serviceTerm) {
  //     filtered = filtered.filter((country) =>
  //       //.includes -> momkn tkoon haga fl nos msh shart fl awal
  //       country.name.common.toLowerCase().includes(serviceTerm),
  //     );
  //     console.log('   After search filter:', filtered.length);
  //   }

  //   //why region first then search second ?? ->
  //   return filtered;
  // });

  ngOnDestroy() {
    // This unsubscribes from ALL subscriptions in the collection at once
    this.subscriptions.unsubscribe();
  }
}
