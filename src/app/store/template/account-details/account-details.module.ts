import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountDetailsRoutingModule } from './account-details-routing.module';
import { MyDataComponent } from './my-data/my-data.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyAddressesComponent } from './my-addresses/my-addresses.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';


@NgModule({
  declarations: [
    MyDataComponent,
    MyOrdersComponent,
    MyAddressesComponent,
    MyFavoritesComponent
  ],
  imports: [
    CommonModule,
    AccountDetailsRoutingModule
  ]
})
export class AccountDetailsModule { }
