import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Inject,
  inject,
  Injectable,
  Type,
} from '@angular/core';
import { AnimationEnum } from '../enums';

type RemoteControlTypeHelper = {
  options: any;
};

type ParentComponentTypeHelper = {
  options: any;
  animationState: any;
  setLoaderComponent(component: Type<any>): void;
  prepareComponentForLoad(
    component: Type<any>,
    remoteControl: RemoteControlTypeHelper
  ): void;
};

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private appRef: ApplicationRef = inject(ApplicationRef);
  private environmentInjector = inject(EnvironmentInjector);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public manageView(
    action: 'attach' | 'detach',
    componentRef: ComponentRef<any>
  ): void {
    if (action === 'attach') {
      this.appRef.attachView(componentRef.hostView);
      this.document.body.appendChild(componentRef.location.nativeElement);
    } else if (action === 'detach') {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }
  }

  public createAndConfigureDynamicComponents<
    ParentComponentType,
    RemoteControlType
  >(
    remoteControl: RemoteControlType & RemoteControlTypeHelper,
    childComponent: Type<any>,
    parentComponent: Type<ParentComponentTypeHelper>,
    loaderComponent?: Type<any>
  ): ComponentRef<ParentComponentType> {
    const parentComponentRef = createComponent(parentComponent, {
      environmentInjector: this.environmentInjector,
    });

    if (loaderComponent) {
      parentComponentRef.instance.setLoaderComponent(loaderComponent);
    }

    parentComponentRef.instance.prepareComponentForLoad(
      childComponent,
      remoteControl
    );

    parentComponentRef.instance.options = remoteControl.options;
    parentComponentRef.instance.animationState = `${remoteControl.options.position}_${AnimationEnum.CLOSED}`;

    return parentComponentRef as ComponentRef<ParentComponentType>;
  }
}
