import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'countries',
    loadComponent: () => import('./features/countries/countries-list/countries-list')
    .then(c => c.CountriesList)
  },
  {
    path: '',
    redirectTo: '/countries',
    pathMatch: 'full'
  }
];

//When someone visits /countries, lazily load the CountriesModule
//When someone visits the root URL (/), redirect to /countries