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
import { MenuItemsComponent } from './template/menu-items/menu-items.component';
import { CartPreviewComponent } from './template/cart-preview/cart-preview.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { LoginComponent } from './template/login/login.component';
import { AccountMenuComponent } from './template/account-menu/account-menu.component';
import { CreateAccountComponent } from './template/create-account/create-account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CartComponent } from './template/cart/cart.component';
import { AccountDetailsComponent } from './template/account-details/account-details.component';
import {AccountDetailsModule} from './template/account-details/account-details.module';
import {AuthGuard} from '../shared/guards/auth-guard';
import {NgxMaskModule} from 'ngx-mask';
import { ForgotPasswordComponent } from './template/forgot-password/forgot-password.component';

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
    OfferComponent,
    MenuItemsComponent,
    CartPreviewComponent,
    LoginComponent,
    AccountMenuComponent,
    CreateAccountComponent,
    CartComponent,
    AccountDetailsComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    AccountDetailsModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    AuthGuard
  ]
})
export class StoreModule {
}
