import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendRequestComponent } from './send-request/send-request.component';
import { ReceiveCodeComponent } from './receive-code/receive-code.component';
import {BetterSendRoutingModule} from './better-send-routing.module';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [SendRequestComponent, ReceiveCodeComponent],
    imports: [
        CommonModule,
        BetterSendRoutingModule,
        SweetAlert2Module
    ]
})
export class BetterSendModule { }
