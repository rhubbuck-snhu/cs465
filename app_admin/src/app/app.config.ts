import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClientJsonpModule } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptProvider } from './utils/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(HttpClientJsonpModule),
    authInterceptProvider
  ]
};
