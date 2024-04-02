import { DrawerPosition } from '../enums';
import { IDrawerOptions } from '../interfaces';

export const DEFAULT_DRAWER_OPTIONS_LEFT: IDrawerOptions = {
  width: '30%',
  height: '100%',
  position: DrawerPosition.LEFT,
  showOverlay: true,
};

export const DEFAULT_DRAWER_OPTIONS_RIGHT: IDrawerOptions = {
  width: '30%',
  height: '100%',
  position: DrawerPosition.RIGHT,
  showOverlay: true,
};

export const DEFAULT_DRAWER_OPTIONS_TOP: IDrawerOptions = {
  width: '100%',
  height: '30%',
  position: DrawerPosition.TOP,
  showOverlay: true,
};

export const DEFAULT_DRAWER_OPTIONS_BOTTOM: IDrawerOptions = {
  width: '100%',
  height: '30%',
  position: DrawerPosition.BOTTOM,
  showOverlay: true,
};
