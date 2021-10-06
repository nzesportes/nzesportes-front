import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingRoutingModule } from './rating-routing.module';
import { RatingFormComponent } from './rating-form/rating-form.component';


@NgModule({
  declarations: [
    RatingFormComponent
  ],
  imports: [
    CommonModule,
    RatingRoutingModule
  ]
})
export class RatingModule { }
