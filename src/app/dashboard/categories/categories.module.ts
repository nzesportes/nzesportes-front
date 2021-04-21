import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoriesListComponent} from './categories-list/categories-list.component';
import {CategoriesNewComponent} from './categories-new/categories-new.component';


@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoriesNewComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule {
}
