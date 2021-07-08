import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MyAddressesRoutingModule} from './my-addresses-routing.module';
import {AddressFormComponent} from './address-form/address-form.component';
import {AddressListComponent} from './address-list/address-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    AddressFormComponent,
    AddressListComponent
  ],
    imports: [
        CommonModule,
        MyAddressesRoutingModule,
        NgxMaskModule.forRoot(),
        ReactiveFormsModule,
        SweetAlert2Module
    ]
})
export class MyAddressesModule {
}
