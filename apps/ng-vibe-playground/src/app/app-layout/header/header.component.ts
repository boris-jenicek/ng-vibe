import { NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ThemeToggleComponent } from '@ng-vibe/shared';

@Component({
  selector: 'ng-vibe-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [NgIf, ThemeToggleComponent],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  isProfileMenuOpen = false;
}
