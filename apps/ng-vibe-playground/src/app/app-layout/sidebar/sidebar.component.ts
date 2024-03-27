import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { IMenuItem, MenuItem } from '../menu-item/menu-item.model';

@Component({
  selector: 'ng-vibe-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [RouterLink, RouterLinkActive, NgClass, MenuItemComponent],
})
export class SidebarComponent {
  menuItems: IMenuItem[] = [this.getDashboardItem()];

  menuType = (item: IMenuItem): IMenuItem => item;
  getDashboardItem(): IMenuItem {
    return new MenuItem('Drawer', true, 'drawer');
  }
}
