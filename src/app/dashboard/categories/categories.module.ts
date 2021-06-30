import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoriesListComponent} from './categories-list/categories-list.component';
import {CategoriesNewComponent} from './categories-new/categories-new.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoriesNewComponent
  ],
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        SweetAlert2Module,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class CategoriesModule {
}
