import { Component, inject } from '@angular/core';
import { ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.html',
})
export class ToggleTheme {
  themeService = inject(ThemeService);
}