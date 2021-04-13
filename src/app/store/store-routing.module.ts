import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StoreComponent} from './store.component';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
    /*children: [
      {
        path: '',
        component: ContentHomeComponent
      },
      { path: '', redirectTo: '', pathMatch: 'full' }
    ]*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
