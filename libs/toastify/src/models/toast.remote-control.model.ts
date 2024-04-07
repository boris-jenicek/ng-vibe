import { Observable } from 'rxjs';
import { DEFAULT_OPTIONS } from '../config';
import { IToastifyOptions } from '../interfaces';
import { ToastService } from '../services';
import { generateRandomString, ServiceLocator } from '../tools';
import { Timer } from './timer.model';

export class ToastifyRemoteControl {
  readonly id = generateRandomString();
  #service: ToastService;
  #autoCloseTimer!: Timer;

  #options: IToastifyOptions = DEFAULT_OPTIONS;
  set options(options: Partial<IToastifyOptions>) {
    this.#options = { ...this.#options, ...this.#preSetup(options) };
  }

  get options(): IToastifyOptions {
    return this.#options;
  }

  constructor() {
    this.#service = ServiceLocator.injector.get(ToastService);
  }

  public openToast(text?: string, title?: string): Observable<any> {
    this.#updateTitleText(text, title);
    this.#autoCloseTimer = new Timer(this.#options.autoCloseDuration);
    return this.#service.open(this);
  }

  public closeToast(data?: any): void {
    this.#service.close(this.id, data);
  }

  public getTimer(): Timer {
    return this.#autoCloseTimer;
  }

  #preSetup(options: Partial<IToastifyOptions>): IToastifyOptions {
    return { ...DEFAULT_OPTIONS, ...options };
  }

  #updateTitleText(text?: string, title?: string) {
    if (text !== undefined) {
      this.options.text = text;
    }

    if (title !== undefined) {
      this.options.title = title;
    }
  }
}
