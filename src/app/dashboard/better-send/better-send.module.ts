import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendRequestComponent } from './send-request/send-request.component';
import { ReceiveCodeComponent } from './receive-code/receive-code.component';
import {BetterSendRoutingModule} from './better-send-routing.module';



@NgModule({
  declarations: [SendRequestComponent, ReceiveCodeComponent],
  imports: [
    CommonModule,
    BetterSendRoutingModule
  ]
})
export class BetterSendModule { }
