import { InjectionToken } from '@angular/core';

export interface IModalizeConfig {}

export const MODALIZE_CONFIG = new InjectionToken<IModalizeConfig>(
  'MODALIZE_CONFIG',
  {
    providedIn: 'root',
    factory: () => defaultConfig,
  }
);

export const defaultConfig: IModalizeConfig = {};
