import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ClientsListComponent} from './clients-list/clients-list.component';
import {ClientsPageRoutingModule} from './clients-page-routing.module';

@NgModule({
  declarations: [
    ClientsListComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    ClientsPageRoutingModule,
    RouterModule
  ]
})
export class ClientsPageModule {
}
