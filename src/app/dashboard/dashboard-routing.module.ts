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
        path: 'produtos',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
