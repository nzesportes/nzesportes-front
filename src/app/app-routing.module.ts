import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthDashGuard} from './shared/guards/auth-dash-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./store/store-nz.module').then(m => m.StoreNzModule)
  },
  {
    path: '',
    canActivate: [AuthDashGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
