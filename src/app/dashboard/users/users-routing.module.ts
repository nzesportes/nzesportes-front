import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersNewComponent} from './users-new/users-new.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent
  },
  {
    path: 'novo-usuario',
    component: UsersNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
