import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Interceptor} from './shared/guards/interceptor';
import {LoadingScreenComponent} from './shared/components/loading-screen/loading-screen.component';
import {AuthGuard} from './shared/guards/auth-guard';
import {AuthVerifyLogin} from './shared/guards/auth-not-logged-guard';
import {AuthService} from './shared/services/auth.service';
import {AuthDashGuard} from './shared/guards/auth-dash-guard';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    LoadingScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    AuthGuard,
    AuthVerifyLogin,
    AuthDashGuard
  ],
    exports: [
        StoreModule,
        LoadingScreenComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
