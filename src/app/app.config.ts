import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { provideRouter } from '@angular/router';
import {
  NbDialogModule,
  NbGlobalPhysicalPosition,
  NbThemeModule,
  NbToastrModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(ROUTES),
    importProvidersFrom(NbThemeModule.forRoot()),
    importProvidersFrom(NbEvaIconsModule),
    importProvidersFrom(NbDialogModule.forRoot()),
    importProvidersFrom(
      NbToastrModule.forRoot({
        duration: 2000,
        position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
        destroyByClick: true,
        preventDuplicates: true
      })
    ),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    })
  ]
};
