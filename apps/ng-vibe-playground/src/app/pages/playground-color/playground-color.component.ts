import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '@ng-vibe/button';
import { ColorManager } from '@ng-vibe/color';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'playground-color',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ButtonComponent, ColorPickerModule],
  templateUrl: './playground-color.component.html',
  styleUrl: './playground-color.component.scss',
})
export class PlaygroundColorComponent {
  color: string;
  //colorManager = new ColorManager('#a33333cc');
  //colorManager = new ColorManager('hsla(204, 70%, 53%, 0.60)');
  colorManager = new ColorManager('rgba(65, 129, 53, 0.60)');

  get toHex(): string {
    return this.colorManager.toHex();
  }
  get toRgb(): string {
    return this.colorManager.toRgb();
  }
  get toHsl(): string {
    return this.colorManager.toHsl();
  }

  get darken(): string {
    return this.colorManager.darken(30);
  }
  get lighten(): string {
    return this.colorManager.lighten(10);
  }
  get transparentize(): string {
    return this.colorManager.transparentize(20);
  }
  get adjustSaturation(): string {
    console.log('1');
    return this.colorManager.adjustSaturation(100);
  }

  changeColor(event: string) {
    this.colorManager.setColor(event);
  }
}
