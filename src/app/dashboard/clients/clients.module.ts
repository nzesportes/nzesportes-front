import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientsListComponent} from './clients-list/clients-list.component';
import {ClientsRoutingModule} from './clients-routing.module';



@NgModule({
  declarations: [ClientsListComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
