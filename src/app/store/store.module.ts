import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { HeaderComponent } from './template/header/header.component';
import { NavBarComponent } from './template/nav-bar/nav-bar.component';
import { BannerComponent } from './template/banner/banner.component';
import { UpComingComponent } from './template/up-coming/up-coming.component';
import { NzStoreComponent } from './template/nz-store/nz-store.component';
import { ContactUsComponent } from './template/contact-us/contact-us.component';
import { FooterComponent } from './template/footer/footer.component';
import { SocialMediaComponent } from './template/social-media/social-media.component';
import { ContentHomeComponent } from './template/content-home/content-home.component';


@NgModule({
    declarations: [StoreComponent, HeaderComponent, NavBarComponent, BannerComponent, UpComingComponent, NzStoreComponent, ContactUsComponent, FooterComponent, SocialMediaComponent, ContentHomeComponent],
    exports: [
        StoreComponent
    ],
    imports: [
        CommonModule,
        StoreRoutingModule
    ]
})
export class StoreModule { }
