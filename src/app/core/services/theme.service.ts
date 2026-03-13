import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  darkMode = signal(localStorage.getItem('theme') === 'dark');

  constructor() {
    effect(() => {
      if (this.darkMode()) {
        //for the tailwind classes
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        //for the tailwind classes
        //Remove the "dark" class from <html>
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  //to switch between dark and light mode
  toggleTheme() {
    //update() is a method on a signal that lets you change its value based on the current value.
    //v is just a parameter name for the current value of the signal.
    //darkMode = v 
    // and flip boolean :!v 
    this.darkMode.update((v) => !v);
  }
}
