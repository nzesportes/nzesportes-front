import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountDetailsRoutingModule } from './account-details-routing.module';
import { MyDataComponent } from './my-data/my-data.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyAddressesComponent } from './my-addresses/my-addresses.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import {MyAddressesModule} from './my-addresses/my-addresses.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    MyDataComponent,
    MyOrdersComponent,
    MyAddressesComponent,
    MyFavoritesComponent,
    ChangePasswordComponent
  ],
    imports: [
        CommonModule,
        AccountDetailsRoutingModule,
        ReactiveFormsModule,
        SweetAlert2Module
    ]
})
export class AccountDetailsModule { }
