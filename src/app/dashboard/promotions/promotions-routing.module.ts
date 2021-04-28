import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PromotionsListComponent} from './promotions-list/promotions-list.component';

const routes: Routes = [
  {
    path: '',
    component: PromotionsListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionsRoutingModule {
}
