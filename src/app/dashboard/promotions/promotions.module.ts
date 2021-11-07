import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PromotionsRoutingModule} from './promotions-routing.module';
import {PromotionsDetailsComponent} from './promotions-details/promotions-details.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {PromotionsListComponent} from './promotions-list/promotions-list.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    PromotionsListComponent,
    PromotionsDetailsComponent
  ],
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    SweetAlert2Module,
    ReactiveFormsModule
  ]
})
export class PromotionsModule {
}
