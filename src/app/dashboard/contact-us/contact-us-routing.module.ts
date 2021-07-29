import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactUsListComponent} from './contact-us-list/contact-us-list.component';
import {ContactUsDetailsComponent} from './contact-us-details/contact-us-details.component';

const routes: Routes = [
  {
    path: '',
    component: ContactUsListComponent
  },
  {
    path: ':id',
    component: ContactUsDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
