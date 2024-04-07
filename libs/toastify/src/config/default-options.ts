import {
  AppearanceAnimation,
  DisappearanceAnimation,
  ProgressBar,
  TextAlignEnum,
  ToastPosition,
  ToastTypeEnum,
} from '../enums';
import { IToastifyOptions } from '../interfaces';

export const DEFAULT_OPTIONS: IToastifyOptions = {
  animationIn: AppearanceAnimation.BOUNCE_IN,
  animationOut: DisappearanceAnimation.ZOOM_OUT,
  position: ToastPosition.TOP_RIGHT,
  autoCloseDuration: 5000,
  progressBar: ProgressBar.INCREASE,
  layoutType: ToastTypeEnum.NEUTRAL,
  textAlign: TextAlignEnum.START,
  showClose: true,
  showIcon: true,
  text: '',
  title: '',
};
