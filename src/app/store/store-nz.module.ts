import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreRoutingModule} from './store-routing.module';
import {StoreComponent} from './store.component';
import {NavBarComponent} from './template/components/nav-bar/nav-bar.component';
import {HeaderComponent} from './template/components/header/header.component';
import {BannerComponent} from './template/components/banner/banner.component';
import {HomeContentComponent} from './template/home-content/home-content.component';
import {ContactUsComponent} from './template/components/contact-us/contact-us.component';
import {SocialMediaComponent} from './template/components/social-media/social-media.component';
import { FooterComponent } from './template/components/footer/footer.component';
import { ComingUpComponent } from './template/components/coming-up/coming-up.component';
import { NzStoreComponent } from './template/components/nz-store/nz-store.component';
import { OfferComponent } from './template/components/offer/offer.component';
import { MenuItemsComponent } from './template/components/menu-items/menu-items.component';
import { CartPreviewComponent } from './template/components/cart-preview/cart-preview.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { LoginComponent } from './template/components/login/login.component';
import { AccountMenuComponent } from './template/components/account-menu/account-menu.component';
import { CreateAccountComponent } from './template/create-account/create-account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CartComponent } from './template/cart/cart.component';
import { AccountDetailsComponent } from './template/account-details/account-details.component';
import {AccountDetailsModule} from './template/account-details/account-details.module';
import {AuthGuard} from '../shared/guards/auth-guard';
import {NgxMaskModule} from 'ngx-mask';
import { ForgotPasswordComponent } from './template/components/forgot-password/forgot-password.component';
import { ProductDetailComponent } from './template/product-detail/product-detail.component';
import {NgxImageZoomModule} from 'ngx-image-zoom';
import { ProductListingComponent } from './template/product-listing/product-listing.component';
import { FiltersComponent } from './template/components/filters/filters.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { OrderReviewComponent } from './template/order-review/order-review.component';
import {MyAddressesModule} from './template/account-details/my-addresses/my-addresses.module';
import { FirstAccessComponent } from './template/first-access/first-access.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import { CartEffect } from './redux/cart/cart.effect';
import * as fromProduct from './redux/cart/cart.reducer';
import { RatingComponent } from './template/rating/rating.component';
import { SizeGuideComponent } from './template/size-guide/size-guide.component';
import {AuthOrderReviewGuard} from '../shared/guards/auth-order-review.guard';
import { DevelopedByComponent } from './template/components/developed-by/developed-by.component';

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
    ForgotPasswordComponent,
    ProductDetailComponent,
    ProductListingComponent,
    FiltersComponent,
    OrderReviewComponent,
    FirstAccessComponent,
    RatingComponent,
    SizeGuideComponent,
    DevelopedByComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    AccountDetailsModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgxImageZoomModule,
    SweetAlert2Module,
    MyAddressesModule,

    StoreModule.forFeature(fromProduct.productsFeatureKey, fromProduct.reducer),
    EffectsModule.forFeature([CartEffect]),
  ],
  providers: [
    AuthGuard,
    AuthOrderReviewGuard
  ]
})
export class StoreNzModule {
}
