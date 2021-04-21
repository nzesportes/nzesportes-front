import {Component, OnInit} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-nz-store',
  templateUrl: './nz-store.component.html',
  styleUrls: ['./nz-store.component.scss']
})
export class NzStoreComponent implements OnInit {

  dynamicSlides = [
    {
      id: 1,
      src: 'assets/images/product.jpg',
      alt: 'Side 1',
      title: 'Side 1',
      promotion: true,
      new: false
    },
    {
      id: 2,
      src: 'assets/images/product.jpg',
      alt: 'Side 2',
      title: 'Side 2',
      promotion: false,
      new: false
    },
    {
      id: 3,
      src: 'assets/images/product.jpg',
      alt: 'Side 3',
      title: 'Side 3',
      promotion: false,
      new: false
    },
    {
      id: 4,
      src: 'assets/images/product.jpg',
      alt: 'Side 4',
      title: 'Side 4',
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
    autoplay: true,
    autoplayHoverPause: true,
    autoplaySpeed: 700,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-arrow-left"></i> Anterior', 'Próxima <i class="fas fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };


  constructor() {
  }

  ngOnInit(): void {
  }

}
