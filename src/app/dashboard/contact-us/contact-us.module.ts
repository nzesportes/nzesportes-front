import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContactUsRoutingModule} from './contact-us-routing.module';
import {ContactUsListComponent} from './contact-us-list/contact-us-list.component';
import {ContactUsDetailsComponent} from './contact-us-details/contact-us-details.component';


@NgModule({
  declarations: [
    ContactUsListComponent,
    ContactUsDetailsComponent
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule
  ]
})
export class ContactUsModule {
}
