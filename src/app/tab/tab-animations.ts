import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export const tabAnimation = trigger('tabInOut', [
  state('void', style({ transform: 'scaleY(0)', opacity: 0 })), // Initial state
  state('*', style({ transform: 'scaleY(1)', opacity: 1 })), // Final state
  transition(':enter', [animate('300ms')]), // Transition in
  transition(':leave', [animate('300ms')]), // Transition out
]);
