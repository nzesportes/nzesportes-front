import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  avaliacao = 3.8;
  positionImage = 0;

  dynamicSlides = [
    {
      id: 1,
      fullImage: 'assets/images/nike-preto.jpg',
      thumb: 'assets/images/nike-preto-thumb.jpg'
    },
    {
      id: 2,
      fullImage: 'assets/images/nike-vermelho.jpg',
      thumb: 'assets/images/nike-vermelho-thumb.jpg'
    },
    {
      id: 3,
      fullImage: 'assets/images/tenis-vermelho.jpg',
      thumb: 'assets/images/tenis-vermelho-thumb.jpg'
    },
    {
      id: 4,
      fullImage: 'assets/images/vans-vinho.jpg',
      thumb: 'assets/images/vans-vinho-thumb.jpg'
    }
  ];

  customOptions: OwlOptions = {
    loop: true,
    margin: 0,
    autoplay: false,
    autoplaySpeed: 700,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-arrow-left"></i> Anterior', 'Próxima <i class="fas fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  };

  constructor() {
  }

  ngOnInit(): void {
  }


  changeImage(index: number): void {
    this.positionImage = index;
  }
}
