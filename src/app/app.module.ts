import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { AppSettingsService } from './shared/services/app-settings.service';
import { SharedModule } from './shared/shared.module';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { CacheLocation } from '@auth0/auth0-spa-js';
import { environment as env } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Auth0AuthnExtensionHttpInterceptor } from './shared/interceptors/auth-extension-http-interceptor';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RoutesModule,
    SharedModule.forRoot(),
    AuthModule.forRoot({
      ...env.auth,
      useRefreshTokens: true,
      cacheLocation: 'localstorage' as CacheLocation,
      httpInterceptor: {
        ...env.httpInterceptor,
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Auth0AuthnExtensionHttpInterceptor,
      multi: true,
    },
    {
      provide: Window,
      useValue: window,
    },
    AppSettingsService,
    {
        provide: APP_INITIALIZER,
        useFactory: (service: AppSettingsService) => () => service.load(),
        deps: [AppSettingsService], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
 }
