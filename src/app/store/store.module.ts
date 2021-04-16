import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreRoutingModule} from './store-routing.module';
import {StoreComponent} from './store.component';
import {NavBarComponent} from './template/nav-bar/nav-bar.component';
import {HeaderComponent} from './template/header/header.component';
import {BannerComponent} from './template/banner/banner.component';
import {HomeContentComponent} from './template/home-content/home-content.component';
import {ContactUsComponent} from './template/contact-us/contact-us.component';
import {SocialMediaComponent} from './template/social-media/social-media.component';
import { FooterComponent } from './template/footer/footer.component';
import { ComingUpComponent } from './template/coming-up/coming-up.component';
import { NzStoreComponent } from './template/nz-store/nz-store.component';
import { OfferComponent } from './template/offer/offer.component';


@NgModule({
  declarations: [
    StoreComponent,
    NavBarComponent,
    HeaderComponent,
    BannerComponent,
    HomeContentComponent,
    ContactUsComponent,
    SocialMediaComponent,
    FooterComponent,
    ComingUpComponent,
    NzStoreComponent,
    OfferComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule
  ]
})
export class StoreModule {
}
