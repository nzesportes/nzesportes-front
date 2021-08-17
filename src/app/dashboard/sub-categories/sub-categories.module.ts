import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoriesListComponent } from './sub-categories-list/sub-categories-list.component';
import { SubCategoriesNewComponent } from './sub-categories-new/sub-categories-new.component';
import {SubCategoriesRoutingModule} from './sub-categories-routing.module';



@NgModule({
  declarations: [SubCategoriesListComponent, SubCategoriesNewComponent],
  imports: [
    CommonModule,
    SubCategoriesRoutingModule
  ]
})
export class SubCategoriesModule { }
