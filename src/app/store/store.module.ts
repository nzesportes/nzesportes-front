import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { NavBarComponent } from './template/nav-bar/nav-bar.component';
import { HeaderComponent } from './template/header/header.component';
import { BannerComponent } from './template/banner/banner.component';
import { HomeContentComponent } from './template/home-content/home-content.component';
import { ContactUsComponent } from './template/contact-us/contact-us.component';


@NgModule({
  declarations: [StoreComponent, NavBarComponent, HeaderComponent, BannerComponent, HomeContentComponent, ContactUsComponent],
  imports: [
    CommonModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
