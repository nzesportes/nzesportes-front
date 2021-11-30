import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CouponRoutingModule} from './coupon-routing.module';
import {CouponListComponent} from './coupon-list/coupon-list.component';
import {CouponDetailsComponent} from './coupon-details/coupon-details.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';


@NgModule({
  declarations: [
    CouponListComponent,
    CouponDetailsComponent
  ],
  imports: [
    CommonModule,
    CouponRoutingModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ]
})
export class CouponModule {
}
