import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductsListComponent} from './products-list/products-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewProductComponent} from './new-product/new-product.component';



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
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
