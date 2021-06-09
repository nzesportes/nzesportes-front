import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AccountMainComponent} from './account-main/account-main.component';

const routes: Routes = [
  {
    path: '',
    component: AccountMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
