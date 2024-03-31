import { AppearanceAnimation, DisappearanceAnimation } from '../enums';

export interface IDialogOptions {
  width: string;
  height: string;
  minWidth: string;
  maxWidth: string;
  minHeight: string;
  maxHeight: string;
  fullScreen: boolean;
  showOverlay: boolean;
  animationIn: AppearanceAnimation;
  animationOut: DisappearanceAnimation;
}
