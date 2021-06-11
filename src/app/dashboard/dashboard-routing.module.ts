import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardMainComponent} from './dashboard-main/dashboard-main.component';

const routes: Routes = [
  {
    path: 'painel',
    component: DashboardMainComponent,
    children: [
      {
        path: 'clientes',
        loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: 'categorias',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'marcas',
        loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule)
      },
      {
        path: 'produtos',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'promocoes',
        loadChildren: () => import('./promotions/promotions.module').then(m => m.PromotionsModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'conta',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
      },
      { path: '', redirectTo: 'produtos', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
