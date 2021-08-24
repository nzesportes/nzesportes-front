import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountDetailsComponent} from '../account-details.component';
import {MyDataComponent} from '../my-data/my-data.component';
import {MyOrdersComponent} from '../my-orders/my-orders.component';
import {MyFavoritesComponent} from '../my-favorites/my-favorites.component';
import {AuthGuard} from '../../../../shared/guards/auth-guard';
import {MyAddressesComponent} from './my-addresses.component';
import {AddressFormComponent} from './address-form/address-form.component';
import {AddressListComponent} from './address-list/address-list.component';

const routes: Routes = [
  {
    path: '',
    component: MyAddressesComponent,
    children: [
      {
        path: '',
        component: AddressListComponent
      },
      {
        path: 'novo',
        component: AddressFormComponent
      },
      { path: '', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAddressesRoutingModule { }
