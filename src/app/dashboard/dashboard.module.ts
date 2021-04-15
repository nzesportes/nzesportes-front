import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClientsModule} from './clients/clients.module';
import {ProductsModule} from './products/products.module';
import {DashboardMainComponent} from './dashboard-main/dashboard-main.component';


@NgModule({
  declarations: [
    DashboardMainComponent
  ],
  imports: [
    // modules dash
    ClientsModule,
    ProductsModule,
    CommonModule,
    DashboardRoutingModule,
    CommonModule,
    RouterModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
  ]
})
export class DashboardModule { }
