import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  inject,
  Injectable,
} from '@angular/core';
import { ToastComponent } from '../components';
import { ToastPosition } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class DomService {
  private toastWrappers: Map<ToastPosition, HTMLElement> = new Map();
  private document: Document = inject(DOCUMENT);
  private appRef: ApplicationRef = inject(ApplicationRef);

  public manageView(
    action: 'attach' | 'detach',
    componentRef: ComponentRef<ToastComponent>,
    position: ToastPosition
  ): void {
    const wrapper = this.ensureWrapperExists(position);

    if (action === 'attach') {
      const element = (componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      wrapper.prepend(element);

      this.slideDownVisible(element, wrapper, position);

      this.appRef.attachView(componentRef.hostView);
    } else if (action === 'detach') {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
      this.removeWrapperIfEmpty(position);
    }
  }

  private slideDownVisible(
    newElement: HTMLElement,
    wrapper: HTMLElement,
    position: ToastPosition
  ) {
    if (
      position === ToastPosition.TOP_RIGHT ||
      position === ToastPosition.TOP_CENTER ||
      position === ToastPosition.TOP_LEFT ||
      position === ToastPosition.TOP_FULL_WIDTH
    ) {
      requestAnimationFrame(() => {
        newElement.classList.add('toast-slide-down-first');
        Array.from(wrapper.children).forEach((child, index) => {
          if (index > 0) {
            (child as HTMLElement).classList.add('toast-slide-down-all');
          }
        });
      });

      setTimeout(() => {
        newElement.classList.remove('toast-slide-down-first');
        Array.from(wrapper.children).forEach((child) => {
          (child as HTMLElement).classList.remove('toast-slide-down-all');
        });
      }, 300);
    }
  }

  private ensureWrapperExists(position: ToastPosition): HTMLElement {
    let wrapper = this.toastWrappers.get(position);
    if (!wrapper) {
      wrapper = this.document.createElement('div');
      wrapper.id = `toastify-wrapper-${position}`;
      wrapper.className = `toastify-wrapper toastify-wrapper-${position}`;
      this.document.body.appendChild(wrapper);
      this.toastWrappers.set(position, wrapper);
    }
    return wrapper;
  }

  private removeWrapperIfEmpty(position: ToastPosition): void {
    const wrapper = this.toastWrappers.get(position);
    setTimeout(() => {
      if (wrapper && wrapper.childNodes.length === 0) {
        wrapper.remove();
        this.toastWrappers.delete(position);
      }
    }, 0);
  }
}
