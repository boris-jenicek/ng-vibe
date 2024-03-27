import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AnimationEnum, DrawerPosition } from '../enums';

export const drawerAnimations: AnimationTriggerMetadata = trigger(
  'drawerAnimations',
  [
    // For left drawer
    state(
      `${DrawerPosition.LEFT}_${AnimationEnum.OPEN}`,
      style({ transform: 'translateX(0)' })
    ),
    state(
      `${DrawerPosition.LEFT}_${AnimationEnum.CLOSED}`,
      style({ transform: 'translateX(-100%)' })
    ),
    // For right drawer
    state(
      `${DrawerPosition.RIGHT}_${AnimationEnum.OPEN}`,
      style({ transform: 'translateX(0)' })
    ),
    state(
      `${DrawerPosition.RIGHT}_${AnimationEnum.CLOSED}`,
      style({ transform: 'translateX(100%)' })
    ),
    // For top drawer
    state(
      `${DrawerPosition.TOP}_${AnimationEnum.OPEN}`,
      style({ transform: 'translateY(0)' })
    ),
    state(
      `${DrawerPosition.TOP}_${AnimationEnum.CLOSED}`,
      style({ transform: 'translateY(-100%)' })
    ),
    // For bottom drawer
    state(
      `${DrawerPosition.BOTTOM}_${AnimationEnum.OPEN}`,
      style({ transform: 'translateY(0)' })
    ),
    state(
      `${DrawerPosition.BOTTOM}_${AnimationEnum.CLOSED}`,
      style({ transform: 'translateY(100%)' })
    ),

    // Transitions for left drawer
    transition(
      `${DrawerPosition.LEFT}_${AnimationEnum.CLOSED} => ${DrawerPosition.LEFT}_${AnimationEnum.OPEN}`,
      animate('0.5s ease-out')
    ),
    transition(
      `${DrawerPosition.LEFT}_${AnimationEnum.OPEN} => ${DrawerPosition.LEFT}_${AnimationEnum.CLOSED}`,
      animate('0.3s ease-in')
    ),
    // Transitions for right drawer
    transition(
      `${DrawerPosition.RIGHT}_${AnimationEnum.CLOSED} => ${DrawerPosition.RIGHT}_${AnimationEnum.OPEN}`,
      animate('0.5s ease-out')
    ),
    transition(
      `${DrawerPosition.RIGHT}_${AnimationEnum.OPEN} => ${DrawerPosition.RIGHT}_${AnimationEnum.CLOSED}`,
      animate('0.3s ease-in')
    ),
    // Transitions for top drawer
    transition(
      `${DrawerPosition.TOP}_${AnimationEnum.CLOSED} => ${DrawerPosition.TOP}_${AnimationEnum.OPEN}`,
      animate('0.5s ease-out')
    ),
    transition(
      `${DrawerPosition.TOP}_${AnimationEnum.OPEN} => ${DrawerPosition.TOP}_${AnimationEnum.CLOSED}`,
      animate('0.3s ease-in')
    ),
    // Transitions for bottom drawer
    transition(
      `${DrawerPosition.BOTTOM}_${AnimationEnum.CLOSED} => ${DrawerPosition.BOTTOM}_${AnimationEnum.OPEN}`,
      animate('0.5s ease-out')
    ),
    transition(
      `${DrawerPosition.BOTTOM}_${AnimationEnum.OPEN} => ${DrawerPosition.BOTTOM}_${AnimationEnum.CLOSED}`,
      animate('0.3s ease-in')
    ),
  ]
);
