import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StoreComponent} from './store.component';
import {HomeContentComponent} from './template/home-content/home-content.component';
import {CreateAccountComponent} from './template/create-account/create-account.component';
import {CartComponent} from './template/cart/cart.component';
import {AuthVerifyLogin} from '../shared/guards/auth-not-logged-guard';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
    children: [
      {
        path: '',
        component: HomeContentComponent
      },
      {
        path: 'criar-conta',
        component: CreateAccountComponent,
        canActivate: [AuthVerifyLogin]
      },
      {
        path: 'carrinho',
        component: CartComponent
      },
      {
        path: 'minha-conta',
        loadChildren: () => import('./template/account-details/account-details.module').then(m => m.AccountDetailsModule)
      },
      { path: '', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
