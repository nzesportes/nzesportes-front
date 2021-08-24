import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersNewComponent} from './users-new/users-new.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ UsersListComponent, UsersNewComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        SweetAlert2Module,
        ReactiveFormsModule
    ]
})
export class UsersModule { }
