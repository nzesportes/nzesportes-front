import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClientsModule} from './clients/clients.module';
import {ProductsModule} from './products/products.module';
import {DashboardMainComponent} from './dashboard-main/dashboard-main.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {PromotionsModule} from './promotions/promotions.module';
import {CategoriesModule} from './categories/categories.module';
import {UsersModule} from './users/users.module';
import {BrandsModule} from './brands/brands.module';
import {AccountModule} from './account/account.module';
import {BetterSendModule} from './better-send/better-send.module';
import {NgxMaskModule} from 'ngx-mask';


@NgModule({
  declarations: [
    DashboardMainComponent
  ],
  imports: [
    // modules dash
    ClientsModule,
    ProductsModule,
    PromotionsModule,
    CategoriesModule,
    UsersModule,
    BrandsModule,
    AccountModule,
    BetterSendModule,
    // angular modules
    DashboardRoutingModule,
    CommonModule,
    RouterModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forChild(),
    NgxMaskModule.forRoot(),

  ],
  providers: [
  ]
})
export class DashboardModule { }
