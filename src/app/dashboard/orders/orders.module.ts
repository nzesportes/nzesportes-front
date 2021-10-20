import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [OrdersListComponent, OrdersDetailsComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class OrdersModule { }
