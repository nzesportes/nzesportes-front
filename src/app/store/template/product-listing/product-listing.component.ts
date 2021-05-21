import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  dynamicSlides = [
    {
      id: 1,
      src: 'assets/images/product.jpg',
      alt: 'Side 1',
      title: 'Camiseta Preta',
      url: 'camiseta-preta',
      promotion: true,
      new: false
    },
    {
      id: 2,
      src: 'assets/images/product.jpg',
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
    },
    {
      id: 6,
      src: 'assets/images/product.jpg',
      alt: 'Side 6',
      title: 'Side 6',
      promotion: false,
      new: false
    },
    {
      id: 7,
      src: 'assets/images/product.jpg',
      alt: 'Side 7',
      title: 'Side 7',
      promotion: false,
      new: false
    },
    {
      id: 8,
      src: 'assets/images/product.jpg',
      alt: 'Side 8',
      title: 'Side 8',
      promotion: false,
      new: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
