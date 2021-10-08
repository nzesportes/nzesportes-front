import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../../../shared/services/menu.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  banners: string[] = [];

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.getLayoutImages()
      .pipe(take(1))
      .subscribe( r => {
        if (r) {
          this.banners = r.bannerImages.split(';');
          this.banners = this.banners.length > 1 ? this.banners.slice(0, 2) : this.banners.slice(0, 2);
        }else{
          this.defaultImages();
        }
      }, () => {
        console.log('error ao carregar o banner inferior');
        this.defaultImages();
      });
  }
  defaultImages(): void {
    this.banners.push('https://res.cloudinary.com/nzesportes/image/upload/v1633663819/produtos/red_mf35b2.jpg');
    this.banners.push('https://res.cloudinary.com/nzesportes/image/upload/v1633663819/produtos/blue_pxfube.jpg');
  }

}
