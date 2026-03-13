import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country';
import { environment } from '../../../environments/environment.prod';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesApiService {
  //'http' object will allow us to make API calls, since we got an instance of HttpClient without needing a constructor bec we used inject()
  private http: HttpClient = inject(HttpClient);

  //previous signal variables was for local filtering , but we want api calls

  //.get() returns an Observable ,,and the getAllCountries function returns an observable:emitting an array of Country objects.
  //The Observable is created in the service, but subscribed to in the component!
  //Why Observable? -> The request is asynchronous,Angular doesn’t immediately get data; it waits for the server response.
  //Note : Angular doesn’t actually send the HTTP request yet.
  //Observables in Angular are lazy. That means nothing happens until someone subscribes
  //The subscription is what “activates” the Observable. It tells Angular:“Hey, start executing this stream, and send me the results when they arrive.”
  //.subscribe() → starts the Observable and listens for emitted values.
  //next → is a callback inside subscribe() that runs each time a value is emitted.

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
      //pipe() allows you to combine multiple transformations on the Observable stream, executed in the order L To R 
      .pipe(map((countries: Country[]) => countries[0]));
  }

  //Note : is there a difference between <Country> and <Country[]>?
  //<Country> -> single object , so, 1 country !
  // <Country[]> -> array of objects ,so, many countries!

  getByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.apiUrl}/region/${region}`);
  }

  searchByName(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.apiUrl}/name/${name}`).pipe(
      // Filter results to only include countries where common name matches
      map((countries) =>
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(name.toLowerCase()),
        ),
      ),
    );
  }
}
