import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../../../shared/services/menu.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  banners: string[] = [];
  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.getLayoutImages()
      .pipe(take(1))
      .subscribe( r => {
        if (r) {
            this.banners = r.slideImages.split(';');
        }else{
          this.defaultImages();
        }
      }, () => {
          console.log('error ao carregar o slides superio');
          this.defaultImages();
      });
  }
  defaultImages(): void {
    this.banners.push('https://res.cloudinary.com/nzesportes/image/upload/v1633663374/produtos/all-star_lysq71.jpg');
    this.banners.push('https://res.cloudinary.com/nzesportes/image/upload/v1633663372/produtos/nike_budd7y.jpg');
  }

}
