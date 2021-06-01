import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountMainComponent } from './account-main/account-main.component';
import {AccountRoutingModule} from './account-routing.module';



@NgModule({
  declarations: [AccountMainComponent],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
