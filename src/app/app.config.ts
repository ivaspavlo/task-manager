import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { provideRouter } from '@angular/router';
import { NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { ROUTES } from './app.routes';

import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(ROUTES),
    importProvidersFrom(NbThemeModule.forRoot()),
    importProvidersFrom(NbEvaIconsModule),
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
