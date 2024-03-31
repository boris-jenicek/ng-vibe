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

export const overlayAnimation: AnimationTriggerMetadata = trigger(
  'overlayAnimation',
  [
    state('enter', style({ opacity: 1 })),

    state('leave', style({ opacity: 0 })),
    transition('void => enter', [
      style({ opacity: 0 }),
      group([
        animate('300ms ease-in', style({ opacity: 1 })),
        query('@boxAnimations', animateChild(), { optional: true }),
      ]),
    ]),
    transition('enter => leave', [
      group([
        query('@boxAnimations', animateChild(), { optional: true }),
        animate('600ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ]
);
