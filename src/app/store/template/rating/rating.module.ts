import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingRoutingModule } from './rating-routing.module';
import { RatingFormComponent } from './rating-form/rating-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    RatingFormComponent
  ],
  imports: [
    CommonModule,
    RatingRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class RatingModule { }
