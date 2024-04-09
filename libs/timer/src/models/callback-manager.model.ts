import { ICallbackManager } from '../interafce';

export class CallbackManager implements ICallbackManager {
  private onUpdateCallbacks: Array<
    (progress: number, remaining: number) => void
  > = [];
  private onTimeoutCallbacks: Array<() => void> = [];

  addOnUpdateCallback(
    callback: (progress: number, remaining: number) => void
  ): void {
    this.onUpdateCallbacks.push(callback);
  }

  addOnTimeoutCallback(callback: () => void): void {
    this.onTimeoutCallbacks.push(callback);
  }

  notifyUpdate(progress: number, remaining: number): void {
    this.onUpdateCallbacks.forEach((callback) => callback(progress, remaining));
  }

  notifyTimeout(): void {
    this.onTimeoutCallbacks.forEach((callback) => callback());
  }
}
