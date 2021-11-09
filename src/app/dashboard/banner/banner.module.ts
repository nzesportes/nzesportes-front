import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerNewComponent } from './banner-new/banner-new.component';
import {BannerRoutingModule} from './banner.routing.module';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [BannerNewComponent],
  imports: [
    CommonModule,
    BannerRoutingModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BannerModule { }
