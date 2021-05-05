import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountDetailsModule} from './account-details.module';
import {MyDataComponent} from './my-data/my-data.component';
import {AccountDetailsComponent} from './account-details.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {MyAddressesComponent} from './my-addresses/my-addresses.component';
import {MyFavoritesComponent} from './my-favorites/my-favorites.component';

const routes: Routes = [
  {
    path: '',
    component: AccountDetailsComponent,
    children: [
      {
        path: 'meus-dados',
        component: MyDataComponent
      },
      {
        path: 'meus-pedidos',
        component: MyOrdersComponent
      },
      {
        path: 'enderecos',
        component: MyAddressesComponent
      },
      {
        path: 'favoritos',
        component: MyFavoritesComponent
      },
      { path: '', redirectTo: 'meus-dados', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountDetailsRoutingModule { }
