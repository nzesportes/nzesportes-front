import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Interceptor} from './shared/guards/interceptor';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';

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
    SweetAlert2Module.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
