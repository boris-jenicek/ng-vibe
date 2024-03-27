import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IMenuItem } from './menu-item.model';

@Component({
  selector: 'ng-vibe-menu-item',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class MenuItemComponent {
  @Input({ required: true }) menuItem!: IMenuItem;
  @ViewChild('itemRla', { static: true }) itemRla!: RouterLinkActive;

  menuType = (item: IMenuItem): IMenuItem => item;

  collapseOtherItems() {
    // todo create collapse other menu items on click
  }
}
