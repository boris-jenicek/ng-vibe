import { ICallbackManager } from '../interafce';

export class Timer {
  private timePassed = 0;
  private timerId: number | null = null;
  private startTime: number | null = null;
  private updateInterval = 100;
  private milliseconds = 0;
  private paused = false;
  private stopped = false;
  protected callbackManager: ICallbackManager;

  constructor(milliseconds: number, callbackManager: ICallbackManager) {
    this.milliseconds = milliseconds;
    this.callbackManager = callbackManager;
  }

  public setMilliseconds(milliseconds: number): void {
    this.milliseconds = milliseconds;
  }

  public setUpdateInterval(interval: number): void {
    this.updateInterval = interval;
  }

  public start(): void {
    if (this.timerId !== null || this.paused || this.stopped) return;
    this.startTime = Date.now();
    this.timerId = this.createInterval();
  }

  public stop(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.stopped = true;
    this.callbackManager.notifyTimeout();
  }

  public pause(): void {
    if (!this.paused && this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
      this.paused = true;
    }
  }

  public resume(): void {
    if (this.paused && !this.stopped && this.timePassed < this.milliseconds) {
      this.paused = false;
      this.startTime = Date.now() - this.timePassed;
      this.timerId = this.createInterval();
    }
  }

  public reset(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.timePassed = 0;
    this.paused = false;
    this.stopped = false;
  }

  public getProgress(): number {
    if (!this.milliseconds) {
      return 100;
    }
    return this.stopped
      ? 100
      : Math.round((this.timePassed / this.milliseconds) * 100);
  }

  public getRemainingPercentage(): number {
    return 100 - this.getProgress();
  }

  public getRemainingTime(
    format: 'milliseconds' | 'seconds' = 'seconds'
  ): number {
    const remaining = this.milliseconds - this.timePassed;
    return format === 'milliseconds' ? remaining : Math.round(remaining / 1000);
  }

  public getInitialTime(
    format: 'milliseconds' | 'seconds' = 'seconds'
  ): number {
    return format === 'milliseconds'
      ? this.milliseconds
      : Math.round(this.milliseconds / 1000);
  }

  private createInterval() {
    return window.setInterval(() => {
      this.updateTimeAndInvokeCallbacks();
    }, this.updateInterval);
  }

  private updateTimeAndInvokeCallbacks(): void {
    this.timePassed = Date.now() - (this.startTime as number);
    this.timePassed = Math.min(this.timePassed, this.milliseconds);
    const progress = Math.round((this.timePassed / this.milliseconds) * 100);
    const remaining = 100 - progress;

    this.callbackManager.notifyUpdate(progress, remaining);

    if (this.timePassed >= this.milliseconds) {
      this.stop();
    }
  }

  public addOnUpdateCallback(
    callback: (progress: number, remaining: number) => void
  ): void {
    this.callbackManager.addOnUpdateCallback(callback);
  }

  public addOnTimeoutCallback(callback: () => void): void {
    this.callbackManager.addOnTimeoutCallback(callback);
  }
}
