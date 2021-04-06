import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard.component';

const routes: Routes = [
  {
    path: 'painel',
    component: DashboardComponent,
    children: [
      {
        path: 'produtos',
        loadChildren: () => import('./products-page/products-page.module').then(m => m.ProductsPageModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('./clients-page/clients-page.module').then(m => m.ClientsPageModule)
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
