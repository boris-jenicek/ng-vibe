import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { boxAnimations, fadeinOutAnimation } from '../../animations';
import {
  AppearanceAnimation,
  DisappearanceAnimation,
  ProgressBar,
  ToastTypeEnum,
} from '../../enums';
import { ToastifyRemoteControl } from '../../models';

@Component({
  selector: 'ng-vibe-toastify',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['toast.component.scss', 'icons.styles.scss'],
  animations: [boxAnimations, fadeinOutAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class ToastComponent implements AfterViewInit {
  @Output()
  animationDone = new EventEmitter<void>();
  public boxAnimationState:
    | AppearanceAnimation
    | DisappearanceAnimation
    | 'initial' = 'initial';
  public contentAnimationState: 'enter' | 'leave' | undefined = undefined;
  public rc: ToastifyRemoteControl = inject(ToastifyRemoteControl);
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this.placeholder();
    this.boxAnimationState = this.rc.options.animationIn;
    this.cd.detectChanges();
  }

  onAnimationDone(event: any) {
    if (event.toState === this.rc.options.animationOut!) {
      this.animationDone.emit();
    }
  }
  onAnimationStart(event: any) {
    if (event.toState === this.rc.options.animationIn) {
      this.contentAnimationState = 'enter';
    }
  }

  placeholder() {
    if (!this.rc.options.title && !this.rc.options.text) {
      this.rc.options.text = '...';
      this.rc.options.title = '...';
    }
  }

  getProgressPercentage(): number {
    if (this.rc.options.progressBar === ProgressBar.INCREASE) {
      return this.rc.getTimer().getProgress();
    } else if (this.rc.options.progressBar === ProgressBar.DECREASE) {
      return this.rc.getTimer().getRemaining();
    } else {
      return 0;
    }
  }

  getTypeClasses(): string {
    return 'ng-vibe-toastify toastify-' + this.rc.options.layoutType;
  }
  getIconClasses(): string {
    return 'toastify-icon-section ng-vibe-icon-' + this.rc.options.layoutType;
  }
  hasIcon(): boolean {
    return (
      this.rc.options.showIcon &&
      (this.rc.options.layoutType === ToastTypeEnum.SUCCESS ||
        this.rc.options.layoutType === ToastTypeEnum.INFO ||
        this.rc.options.layoutType === ToastTypeEnum.WARNING ||
        this.rc.options.layoutType === ToastTypeEnum.DANGER)
    );
  }

  mouseOver() {
    this.rc.getTimer().pause();
  }

  mouseOut() {
    this.rc.getTimer().resume();
  }
}
