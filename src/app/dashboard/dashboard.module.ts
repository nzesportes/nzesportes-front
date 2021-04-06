import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {SidebarComponent} from './template/sidebar/sidebar.component';
import {TopNavComponent} from './template/top-nav/top-nav.component';
import {HeaderComponent} from './template/header/header.component';
import {FooterComponent} from './template/footer/footer.component';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    TopNavComponent,
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule
  ]
})
export class DashboardModule {
}
