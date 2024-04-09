import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonType } from '../../dependencies';

@Component({
  selector: 'x-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Output() buttonClick: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();

  @Input() disabled = false;
  @Input() cssClass = '';
  @Input() e2e = '';
  @Input() textAlign: 'left' | 'right' | 'center' = 'center';
  @Input() buttonType: ButtonType = 'main-btn';

  get buildButtonCssString(): string {
    let css =
      'my-4 w-full text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ';

    if (this.cssClass) {
      css += this.cssClass;
      css += ' ';
    }
    if (this.textAlign) {
      css += 'text-align-' + this.textAlign;
      css += ' ';
    }
    if (this.buttonType) {
      switch (this.buttonType) {
        case 'main-btn':
          css += 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-300';
          break;
        case 'second-btn':
          css +=
            'bg-secondary-600 hover:bg-secondary-700 focus:ring-secondary-300';
          break;
      }

      css += ' ';
    }
    return css;
  }
}
