import {
  ComponentRef,
  createComponent,
  createEnvironmentInjector,
  EnvironmentInjector,
  inject,
  Injectable,
  Type,
} from '@angular/core';
import { ToastifyRemoteControl } from '../models';
import { provideRemoteControl } from '../providers/remote-control-provider';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private environmentInjector = inject(EnvironmentInjector);

  public createAndConfigureToastify<ParentComponentType>(
    remoteControl: ToastifyRemoteControl,
    parentComponent: Type<ParentComponentType>
  ): ComponentRef<ParentComponentType> {
    const envInjector = createEnvironmentInjector(
      provideRemoteControl(remoteControl),
      this.environmentInjector
    );

    const parentComponentRef = createComponent(parentComponent, {
      environmentInjector: envInjector,
    });

    return parentComponentRef as ComponentRef<ParentComponentType>;
  }
}
