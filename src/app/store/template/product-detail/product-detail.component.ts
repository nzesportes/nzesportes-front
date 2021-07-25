import {Component, OnInit, ViewChild} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {CartService} from '../../services/cart.service';
import {Store} from '@ngrx/store';
import {ProductsService} from '../../../shared/services/products.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {Product} from '../../../shared/models/product.model';
import {ProductDetails, Stock} from '../../../shared/models/product-details.model';
import {take} from 'rxjs/operators';
import * as fromStore from '../../redux/cart/cart.reducer';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  private id = '';

  // @ts-ignore
  productDetails: ProductDetails;
  // @ts-ignore
  product: Product;

  @ViewChild('stock')
  public readonly selectedStock!: any;

  sizeMax = 1;
  startValue = 1;

  avaliacao = 3.8;
  positionImage = 0;

  shipping: any;

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
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
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

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromStore.ProductState>
  ) {
  }

  ngOnInit(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams.url;
      if (this.id) {
        this.productsService.getDetailById(this.id)
          .subscribe(response => {
              this.productDetails = response;
              const productJson = localStorage.getItem('product');
              if (productJson) {
                this.product = JSON.parse(productJson);
              } else {
                this.productsService.getById(this.productDetails.productId)
                  .pipe(take(1))
                  .subscribe(p => {
                    this.product = p;
                  }, error => console.log(error));
              }
            },
            error => {
              console.log(error);
            });
      }
    });
  }

  changeImage(index: number): void {
    this.positionImage = index;
  }

  calculate(): void {
    this.shipping = {dias: 4, valor: 27.50};
  }

  changeMax(index: number): void {
    if (index > 0) {
      this.sizeMax = this.productDetails.stock[index - 1].quantity;
      this.startValue = 1;
    }
  }

  addToCart(productDetail: ProductDetails, stockIndex: number): void {
    this.cartService.addToCart(this.product, productDetail, this.startValue,  this.productDetails.stock[stockIndex - 1]);
    // this.store.dispatch(fromActions.addProduct({ product: itemCart }));
  }

}
