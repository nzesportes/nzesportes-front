import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ClientsListComponent} from './clients-list/clients-list.component';
import {ClientsViewComponent} from './clients-view/clients-view.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsListComponent
  },
  {
    path: 'view/:id',
    component: ClientsViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
