import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CouponListComponent} from './coupon-list/coupon-list.component';
import {CouponDetailsComponent} from './coupon-details/coupon-details.component';

const routes: Routes = [
  {
    path: '',
    component: CouponListComponent
  },
  {
    path: 'detalhes/:id',
    component: CouponDetailsComponent
  },
  {
    path: 'novo-cupom',
    component: CouponDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponRoutingModule { }
