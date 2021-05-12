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
      src: 'https://images.unsplash.com/photo-1620734885969-a3c21e9f34c7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80',
      alt: 'Side 1',
      title: 'Camiseta Preta',
      url: 'camiseta-preta',
      promotion: true,
      new: false
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1593643946890-b5b85ade6451?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1229&q=80',
      alt: 'Side 2',
      title: 'Bermuda NBA',
      url: 'bermuda-nba',
      promotion: false,
      new: false
    },
    {
      id: 3,
      src: 'assets/images/product.jpg',
      alt: 'Side 3',
      title: 'Agasalho Rosa',
      url: 'agasalho-rosa',
      promotion: false,
      new: false
    },
    {
      id: 4,
      src: 'assets/images/product.jpg',
      alt: 'Side 4',
      title: 'Tênis Jordan',
      url: 'tenis-jordan',
      promotion: true,
      new: true
    },
    {
      id: 5,
      src: 'assets/images/product.jpg',
      alt: 'Side 5',
      title: 'Side 5',
      promotion: false,
      new: false
    }
  ];

  customOptions: OwlOptions = {
    loop: true,
    margin: 30,
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
