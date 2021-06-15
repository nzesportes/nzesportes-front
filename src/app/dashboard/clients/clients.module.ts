import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientsListComponent} from './clients-list/clients-list.component';
import {ClientsRoutingModule} from './clients-routing.module';
import { ClientsViewComponent } from './clients-view/clients-view.component';



@NgModule({
  declarations: [ClientsListComponent, ClientsViewComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
