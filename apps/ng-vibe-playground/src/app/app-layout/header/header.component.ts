import { NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ng-vibe-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [NgIf],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  isProfileMenuOpen = false;
}
