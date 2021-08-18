import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoriesListComponent } from './sub-categories-list/sub-categories-list.component';
import { SubCategoriesNewComponent } from './sub-categories-new/sub-categories-new.component';
import {SubCategoriesRoutingModule} from './sub-categories-routing.module';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [SubCategoriesListComponent, SubCategoriesNewComponent],
  imports: [
    CommonModule,
    SubCategoriesRoutingModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SubCategoriesModule { }
