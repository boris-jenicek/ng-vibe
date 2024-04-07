export class Timer {
  private timePassed = 0;
  private timerId: number | null = null;
  private progress = 0;
  private remaining = 100;
  private milliseconds = 0;
  private paused = false;

  onTimeout: (() => void) | null = null;

  constructor(milliseconds: number) {
    this.milliseconds = milliseconds;
  }

  setMilliseconds(milliseconds: number): void {
    this.milliseconds = milliseconds;
  }

  reset(): void {
    this.timePassed = 0;
    this.progress = 0;
    this.remaining = 100;
    this.paused = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  pause(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
      this.paused = true;
    }
  }

  resume(): void {
    if (!this.paused || this.timePassed >= this.milliseconds) {
      return;
    }
    this.paused = false;
    this.start(true);
  }

  stop(): void {
    this.reset();
    if (this.onTimeout) {
      this.onTimeout();
    }
  }

  start(resuming = false): void {
    if (this.timerId !== null && !resuming) {
      return;
    }

    if (!resuming) {
      this.timePassed = 0;
    }

    this.timerId = window.setInterval(() => {
      if (this.timePassed >= this.milliseconds) {
        this.stop();
        if (this.onTimeout) {
          this.onTimeout();
        }
        return;
      }

      this.timePassed += 100;
      this.progress = (this.timePassed / this.milliseconds) * 100;
      this.remaining = 100 - this.progress;
    }, 100);
  }

  getProgress(): number {
    return this.progress;
  }

  getRemaining(): number {
    return this.remaining;
  }
}
