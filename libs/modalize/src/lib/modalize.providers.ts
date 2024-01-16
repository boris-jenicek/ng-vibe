/*
import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  Type,
} from '@angular/core';
import {
  IModalizeConfirmBox,
  MODALIZE_CONFIRM_BOX,
} from './modalize-confirm-box';
import { IModalizeConfig, MODALIZE_CONFIG } from './modalize.config';
import { GlobalConfigService } from './modalize/core/global-config.service';
import { IGlobalUserConfig } from './modalize/core/global-interfaces';

export function provideModalize() {
  const providers: EnvironmentProviders[] = [
    provideModalizeConfig(GlobalConfigService),
  ];
  return providers;
}

export function provideModalizeGlobalConfig(
  globalConfig: Type<IGlobalUserConfig>
) {
  return { provide: 'cdGlobalConfig', useValue: globalConfig };
}
export function provideModalizeConfig(config: Type<IModalizeConfig>) {
  return makeEnvironmentProviders([
    {
      provide: MODALIZE_CONFIG,
      useClass: config,
    },
  ]);
}

export function provideModalizeConfirmBox(
  confirmBoxType: Type<IModalizeConfirmBox>
) {
  return makeEnvironmentProviders([
    {
      provide: MODALIZE_CONFIRM_BOX,
      useClass: confirmBoxType,
    },
  ]);
}
*/
