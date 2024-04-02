import {
  animate,
  animateChild,
  AnimationTriggerMetadata,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AnimationEnum, DrawerPosition } from '../enums';

export const drawerAnimations: AnimationTriggerMetadata = trigger(
  'drawerAnimations',
  [
    // States
    state(
      `${DrawerPosition.LEFT}_${AnimationEnum.OPEN}`,
      style({ transform: 'translateX(0)' })
    ),
    state(
      `${DrawerPosition.LEFT}_${AnimationEnum.CLOSED}`,
      style({ transform: 'translateX(-100%)' })
    ),
    state(
      `${DrawerPosition.RIGHT}_${AnimationEnum.OPEN}`,
      style({ transform: 'translateX(0)' })
    ),
    state(
      `${DrawerPosition.RIGHT}_${AnimationEnum.CLOSED}`,
      style({ transform: 'translateX(100%)' })
    ),
    state(
      `${DrawerPosition.TOP}_${AnimationEnum.OPEN}`,
      style({ transform: 'translateY(0)' })
    ),
    state(
      `${DrawerPosition.TOP}_${AnimationEnum.CLOSED}`,
      style({ transform: 'translateY(-100%)' })
    ),
    state(
      `${DrawerPosition.BOTTOM}_${AnimationEnum.OPEN}`,
      style({ transform: 'translateY(0)' })
    ),
    state(
      `${DrawerPosition.BOTTOM}_${AnimationEnum.CLOSED}`,
      style({ transform: 'translateY(100%)' })
    ),

    // Transitions
    transition(
      `${DrawerPosition.LEFT}_${AnimationEnum.CLOSED} => ${DrawerPosition.LEFT}_${AnimationEnum.OPEN}`,
      group([
        animate('0.5s ease-out', style({ transform: 'translateX(0)' })),
        query('@*', animateChild(), { optional: true }),
      ])
    ),
    transition(
      `${DrawerPosition.LEFT}_${AnimationEnum.OPEN} => ${DrawerPosition.LEFT}_${AnimationEnum.CLOSED}`,
      group([
        query('@*', animateChild(), { optional: true }),
        animate('0.3s ease-in', style({ transform: 'translateX(-100%)' })),
      ])
    ),
    transition(
      `${DrawerPosition.RIGHT}_${AnimationEnum.CLOSED} => ${DrawerPosition.RIGHT}_${AnimationEnum.OPEN}`,
      group([
        animate('0.5s ease-out', style({ transform: 'translateX(0)' })),
        query('@*', animateChild(), { optional: true }),
      ])
    ),
    transition(
      `${DrawerPosition.RIGHT}_${AnimationEnum.OPEN} => ${DrawerPosition.RIGHT}_${AnimationEnum.CLOSED}`,
      group([
        query('@*', animateChild(), { optional: true }),
        animate('0.3s ease-in', style({ transform: 'translateX(100%)' })),
      ])
    ),
    transition(
      `${DrawerPosition.TOP}_${AnimationEnum.CLOSED} => ${DrawerPosition.TOP}_${AnimationEnum.OPEN}`,
      group([
        animate('0.5s ease-out', style({ transform: 'translateY(0)' })),
        query('@*', animateChild(), { optional: true }),
      ])
    ),
    transition(
      `${DrawerPosition.TOP}_${AnimationEnum.OPEN} => ${DrawerPosition.TOP}_${AnimationEnum.CLOSED}`,
      group([
        query('@*', animateChild(), { optional: true }),
        animate('0.3s ease-in', style({ transform: 'translateY(-100%)' })),
      ])
    ),
    transition(
      `${DrawerPosition.BOTTOM}_${AnimationEnum.CLOSED} => ${DrawerPosition.BOTTOM}_${AnimationEnum.OPEN}`,
      group([
        animate('0.5s ease-out', style({ transform: 'translateY(0)' })),
        query('@*', animateChild(), { optional: true }),
      ])
    ),
    transition(
      `${DrawerPosition.BOTTOM}_${AnimationEnum.OPEN} => ${DrawerPosition.BOTTOM}_${AnimationEnum.CLOSED}`,
      group([
        query('@*', animateChild(), { optional: true }),
        animate('0.3s ease-in', style({ transform: 'translateY(100%)' })),
      ])
    ),
  ]
);
