import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountDetailsModule} from './account-details.module';
import {MyDataComponent} from './my-data/my-data.component';
import {AccountDetailsComponent} from './account-details.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {MyAddressesComponent} from './my-addresses/my-addresses.component';
import {MyFavoritesComponent} from './my-favorites/my-favorites.component';
import {AuthGuard} from '../../../shared/guards/auth-guard';
import {ChangePasswordComponent} from './change-password/change-password.component';

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
        path: 'favoritos',
        component: MyFavoritesComponent
      },
      {
        path: 'alterar-senha',
        component: ChangePasswordComponent
      },
      {
        path: 'enderecos',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./my-addresses/my-addresses.module').then(m => m.MyAddressesModule)
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
