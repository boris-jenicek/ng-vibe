import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastConfigService {
  private _maximumToasts = 5;

  get maximumToasts(): number {
    return this._maximumToasts;
  }

  set maximumToasts(value: number) {
    this._maximumToasts = value;
  }
}
