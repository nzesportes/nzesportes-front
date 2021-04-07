import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { HeaderComponent } from './template/header/header.component';


@NgModule({
    declarations: [StoreComponent, HeaderComponent],
    exports: [
        StoreComponent
    ],
    imports: [
        CommonModule,
        StoreRoutingModule
    ]
})
export class StoreModule { }
