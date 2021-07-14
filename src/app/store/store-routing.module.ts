import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreComponent} from './store.component';
import {HomeContentComponent} from './template/home-content/home-content.component';
import {CreateAccountComponent} from './template/create-account/create-account.component';
import {CartComponent} from './template/cart/cart.component';
import {AuthVerifyLogin} from '../shared/guards/auth-not-logged-guard';
import {AuthGuard} from '../shared/guards/auth-guard';
import {ProductDetailComponent} from './template/product-detail/product-detail.component';
import {ProductListingComponent} from './template/product-listing/product-listing.component';
import {OrderReviewComponent} from './template/order-review/order-review.component';

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
        // canActivate: [AuthVerifyLogin]
      },
      {
        path: 'editar-conta/:id',
        component: CreateAccountComponent
      },
      {
        path: 'carrinho',
        component: CartComponent
      },
      {
        path: 'produtos/:url',
        component: ProductDetailComponent
      },
      {
        path: 'search',
        component: ProductListingComponent
      },
      {
        path: 'finalizar-compra',
        component: OrderReviewComponent
      },
      {
        path: 'minha-conta',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./template/account-details/account-details.module').then(m => m.AccountDetailsModule)
      },
      {path: '', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {
}
