import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country';
import { environment } from '../../../environments/environment.prod';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesApiService {
  private http: HttpClient = inject(HttpClient);

  private searchTerm = signal('');

  // private apiUrl = 'https://restcountries.com/v3.1';
  //we dont need to redefine it here , it is already in enviornment.ts , can be used globally

  getAllCountries(): Observable<Country[]> {
    const fields = 'name,capital,region,population,flags';
    return this.http.get<Country[]>(`${environment.apiUrl}/all?fields=${fields}`);
  }

  getCountryByCode(code: string): Observable<Country> {
    //https://restcountries.com/v3.1/alpha/egy returns an ARRAY OF 1 OBJECT okay , but it's an array!
    //and also it can sometimes return /alpha/egy,usa,can → Returns [Egypt, USA, Canada]  (array with 3 items)
    //or /alpha/xyz → Returns []  (empty array) , [] are for array , {} are for objects

    return this.http
      .get<Country[]>(`${environment.apiUrl}/alpha/${code}`)
      .pipe(map((countries: Country[]) => countries[0]));
  }

  //Note : is there a difference between <Country> and <Country[]>?
  //<Country> -> single object , so, 1 country !
  // <Country[]> -> array of objects ,so, many countries!

  getByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.apiUrl}/region/${region}`);
  }

  // Search method - just updates the term
  search(term: string) {
    console.log('3. ApiService search called with:', term);
    this.searchTerm.set(term);
  }

  // Get the current search term, (component will use this to filter)
  getSearchTerm() {
    console.log('4. ApiService getSearchTerm returns:', this.searchTerm());
    return this.searchTerm;
  }
}
