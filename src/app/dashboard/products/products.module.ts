import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductsListComponent} from './products-list/products-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewProductComponent} from './new-product/new-product.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    ProductsListComponent,
    NewProductComponent
  ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module
    ]
})
export class ProductsModule { }
