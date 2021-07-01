import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {map, take} from 'rxjs/operators';
import {ProductsStore} from '../../../../shared/models/products-store.model';
import {ProductsService} from '../../../../shared/services/products.service';
import {Product} from '../../../../shared/models/product.model';


@Component({
  selector: 'app-nz-store',
  templateUrl: './nz-store.component.html',
  styleUrls: ['./nz-store.component.scss']
})
export class NzStoreComponent implements OnInit {

  // @ts-ignore
  products: Product[];
  // @ts-ignore
  productsStore: ProductsStore[];

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


  constructor(
    private productsService: ProductsService
  ) {
  }

  ngOnInit(): void {
    this.getProduct();
  }


  getProduct(): void {
    this.productsService.getAll(8, 0)
      .pipe(
        take(1),
        map(productsStore => {
          const result: ProductsStore[] = [];
          productsStore.content.forEach(p => {
            p.productDetails.forEach(pd => {
              const productStore = {
                id: p.id,
                // description: p.description,
                model: p.model,

                idProductDetails: pd.id,
                color: pd.color,
                size: pd.size,
                price: pd.price,
                brand: p.brand,
                sale: pd.sale,
                gender: pd.gender,
                niche: pd.niche,
                status: pd.status
              };

              result.push(productStore);
            });
          });
          return result;
        })
      )
      .subscribe(products => {
        this.productsStore = products.filter(value => {
          return value.brand.name === 'nz esportes';
        });
      });
  }

}
