export interface ICallbackManager {
  addOnUpdateCallback(
    callback: (progress: number, remaining: number) => void
  ): void;
  addOnTimeoutCallback(callback: () => void): void;
  notifyUpdate(progress: number, remaining: number): void;
  notifyTimeout(): void;
}
