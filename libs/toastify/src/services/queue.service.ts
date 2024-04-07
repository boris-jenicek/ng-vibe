import { Injectable } from '@angular/core';
import { ToastifyRemoteControl } from '../models';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  private toastQueue: ToastifyRemoteControl[] = [];
  private activeToasts: { [key: string]: ToastifyRemoteControl } = {};

  enqueue(toast: ToastifyRemoteControl): void {
    this.toastQueue.push(toast);
  }

  dequeue(): ToastifyRemoteControl | undefined {
    return this.toastQueue.shift();
  }

  markActive(toast: ToastifyRemoteControl): void {
    this.activeToasts[toast.id] = toast;
  }

  removeActive(toastId: string): void {
    delete this.activeToasts[toastId];
  }

  isToastActive(toastId: string): boolean {
    return !!this.activeToasts[toastId];
  }

  getQueueLength(): number {
    return this.toastQueue.length;
  }

  activeCount(): number {
    return Object.keys(this.activeToasts).length;
  }

  clearQueue(): void {
    this.toastQueue = [];
  }

  isToastInQueue(toastId: string): boolean {
    return this.toastQueue.some((toast) => toast.id === toastId);
  }
}
