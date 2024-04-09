import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '@ng-vibe/button';
import { Timer } from '@ng-vibe/timer';

@Component({
  selector: 'playground-toastify',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ButtonComponent],
  templateUrl: './playground-timer.component.html',
  styleUrl: './playground-timer.component.scss',
})
export class PlaygroundTimerComponent {
  timer = new Timer();
  isExpiredCallback = '';

  constructor() {
    this.timer.addOnUpdateCallback((progress, remaining) => {
      // console.log(`Progress: ${progress}%, Remaining: ${remaining}%`);
    });

    this.timer.addOnTimeoutCallback(() => {
      this.isExpiredCallback = 'Timer ended!';
    });
  }
  // region *** Timer ***

  startTimer() {
    this.timer.setMilliseconds(20000);
    this.timer.start();
  }

  stopTimer() {
    this.timer.stop();
  }

  resetTimer() {
    this.timer.reset();
    this.isExpiredCallback = '';
  }
  pauseTimer() {
    this.timer.pause();
  }
  resumeTimer() {
    this.timer.resume();
  }
  // endregion
}
