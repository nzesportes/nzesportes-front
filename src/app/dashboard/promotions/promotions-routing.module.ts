import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PromotionsListComponent} from './promotions-list/promotions-list.component';
import {PromotionsDetailsComponent} from './promotions-details/promotions-details.component';

const routes: Routes = [
  {
    path: '',
    component: PromotionsListComponent
  },
  {
    path: 'detalhes/:id',
    component: PromotionsDetailsComponent
  },
  {
    path: 'nova-promocao',
    component: PromotionsDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionsRoutingModule {
}
