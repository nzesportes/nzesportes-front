import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsListComponent } from './brands-list/brands-list.component';
import { BrandsNewComponent } from './brands-new/brands-new.component';
import {BrandsRoutingModule} from './brands-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [BrandsListComponent, BrandsNewComponent],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module
  ]
})
export class BrandsModule { }
