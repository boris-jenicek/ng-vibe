import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './theme.service';

@Component({
  selector: 'lib-theme-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `theme-toggle.component.html`,
  styles: ``,
})
export class ThemeToggleComponent {
  public themeService: ThemeService = inject(ThemeService);
  isLightTheme = this.themeService.getCurrentTheme() === 'light';
  toggleTheme(): void {
    this.isLightTheme = !this.isLightTheme;
    this.themeService.changeTheme();
  }
}
