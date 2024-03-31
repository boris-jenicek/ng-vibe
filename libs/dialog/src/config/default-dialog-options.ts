import { AppearanceAnimation, DisappearanceAnimation } from '../enums';
import { IDialogOptions } from '../interfaces';

export const DEFAULT_DIALOG_OPTIONS: IDialogOptions = {
  width: 'auto',
  height: 'auto',
  minWidth: 'auto',
  maxWidth: 'none',
  minHeight: 'auto',
  maxHeight: 'none',
  fullScreen: false,
  showOverlay: true,
  animationIn: AppearanceAnimation.ZOOM_IN,
  animationOut: DisappearanceAnimation.ZOOM_OUT,
};
