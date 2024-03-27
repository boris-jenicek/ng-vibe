import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './app-layout/header/header.component';
import { SidebarComponent } from './app-layout/sidebar/sidebar.component';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, SidebarComponent],
  selector: 'ng-vibe-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  ngOnInit() {
    console.log('on init');
  }
}
