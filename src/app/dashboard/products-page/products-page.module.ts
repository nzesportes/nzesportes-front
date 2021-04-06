import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {ProductsPageRoutingModule} from './products-page-routing.module';

@NgModule({
  declarations: [
    ProductsComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    ProductsPageRoutingModule,
    RouterModule
  ]
})
export class ProductsPageModule {
}
