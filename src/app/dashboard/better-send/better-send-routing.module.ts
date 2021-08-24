import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SendRequestComponent} from './send-request/send-request.component';
import {ReceiveCodeComponent} from './receive-code/receive-code.component';


const routes: Routes = [
  {
    path: '',
    component: SendRequestComponent
  },
  {
    path: 'codigo',
    component: ReceiveCodeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BetterSendRoutingModule { }
