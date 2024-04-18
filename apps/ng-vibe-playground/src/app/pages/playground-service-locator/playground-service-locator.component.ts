import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '@ng-vibe/button';
import { ColorPickerModule } from 'ngx-color-picker';
import { CustomClass } from '../../models/custom-dummy.model';

@Component({
  selector: 'playground-color',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ButtonComponent, ColorPickerModule],
  templateUrl: './playground-service-locator.component.html',
  styleUrl: './playground-service-locator.component.scss',
})
export class PlaygroundServiceLocatorComponent {
  customClass = new CustomClass();
  //customClass2 = new CustomClass();
}
