import { Injectable, InjectionToken } from '@angular/core';

export const MODALIZE_CONFIRM_BOX = new InjectionToken<IModalizeConfirmBox>(
  'MODALIZE_CONFIRM_BOX'
);

export interface IModalizeConfirmBox {}

@Injectable({
  providedIn: 'root',
})
export class ModalizeConfirmBox {
  constructor() {}
}
