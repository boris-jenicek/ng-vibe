import { CallbackManager } from './callback-manager.model';
import { Timer } from './timer.model';

export class PublicTimer extends Timer {
  constructor(milliseconds = 0) {
    super(milliseconds, new CallbackManager());
  }
}
