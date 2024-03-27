import {
  animate,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const overlayAnimation: AnimationTriggerMetadata = trigger(
  'overlayAnimation',
  [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms ease-in', style({ opacity: 1 })),
    ]),
    transition(':leave', [animate('600ms ease-out', style({ opacity: 0 }))]),
  ]
);
