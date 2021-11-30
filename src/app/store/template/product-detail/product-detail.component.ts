import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {CartService} from '../../services/cart.service';
import {Store} from '@ngrx/store';
import {ProductsService} from '../../../shared/services/products.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Product} from '../../../shared/models/product.model';
import {ProductDetails, Stock} from '../../../shared/models/product-details.model';
import {take} from 'rxjs/operators';
import * as fromStore from '../../redux/cart/cart.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Shipping} from '../../../shared/models/shipping.model';
import {BetterSendService} from '../../../shared/services/better-send.service';
import {ShippingResult} from '../../../shared/models/shipping-result.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {FiltersService} from '../../services/filters.service';
import {Gender} from '../../../shared/enums/gender';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {RatingService} from '../../../shared/services/rating.service';
import {Rating} from '../../../shared/models/rating.model';
import {RatingPage} from '../../../shared/models/pagination-model/rating-page.model';
import {PaginationService} from '../../../shared/services/pagination.service';
import {Order} from '../../../shared/enums/order.enum';
import {environment} from '../../../../environments/environment';
import {ProductDetailsTO} from '../../../shared/models/product-details-to.model';

export interface ImageSlide {
  id: number;
  fullImage: string;
  thumb: string;
  fullImageSafe: SafeResourceUrl;
  thumbSafe: SafeResourceUrl;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  private id = '';

  // @ts-ignore
  productDetails: ProductDetailsTO;
  // @ts-ignore
  product: Product;

  images: string[] | undefined;

  @ViewChild('stock')
  public readonly selectedStock!: any;
  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;

  sizeMax = 1;
  startValue = 1;

  rating = 0;
  positionImage = 0;

  totalRatings = 0;
  contentRating!: RatingPage;
  ratings: Rating[] = [];
  hasErrorRating = false;
  bestRating = 0;

  shippingResult: ShippingResult[] = [];
  notShipResult = false;
  errorShipResult = false;
  public hasError = false;
  noStock = false;

  dynamicSlides: ImageSlide[] = [];

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

  public formStock: FormGroup = new FormGroup({});
  public formShipping: FormGroup = new FormGroup({});

  constructor(
    public paginationService: PaginationService,
    private cartService: CartService,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromStore.ProductState>,
    private formBuilder: FormBuilder,
    private betterSendService: BetterSendService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private ratingService: RatingService,
    private filterService: FiltersService
  ) {
  }

  ngOnInit(): void {
    this.paginationService.initPagination();
    this.noStock = false;
    window.scrollTo(0, 0);
    this.createForm();
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams.url;
      this.hasError = false;
      if (this.id) {
        this.productsService.getDetailById(this.id)
          .subscribe(response => {
              this.hasError = false;
              this.productDetails = response;
              this.createForm();
              this.formStock.get('stocksize')?.setValue(this.productDetails.stock[0]);
              this.changeMax(0);
              this.setImages();
              const productJson = sessionStorage.getItem('product');
              if (productJson) {
                this.product = JSON.parse(productJson);
                this.getRatingsByProductId(this.product.id, this.paginationService.page, 10);
              } else {
                this.productsService.getById(this.productDetails.productId)
                  .pipe(take(1))
                  .subscribe(p => {
                    this.product = p;
                    this.getRatingsByProductId(this.product.id, this.paginationService.page, 10);
                    this.hasError = false;
                  }, error => {
                    console.log(error);
                    this.hasError = true;
                  });
              }
            },
            error => {
              console.log(error);
              this.hasError = true;
            });
      }
    }, error => {
      console.log(error);
      this.hasError = true;
    });
  }

  ngOnDestroy(): void {
    this.sizeMax = 1;
    this.startValue = 1;

    this.rating = 0;
    this.positionImage = 0;

    this.shippingResult = [];
    this.notShipResult = false;
    this.errorShipResult = false;
    this.hasError = false;
    this.noStock = false;
    this.formStock.reset();
  }

  setImages(): void {
    this.dynamicSlides = [];
    this.productDetails.images.split(';').forEach((image, i) => {
      this.dynamicSlides.push({
        id: i,
        fullImage: image,
        thumb: image,
        fullImageSafe: this.sanitizer.bypassSecurityTrustResourceUrl(image),
        thumbSafe: this.sanitizer.bypassSecurityTrustResourceUrl(image)
      });
    });
  }

  routerLinkToProduct(id: string): void {
    this.formStock.reset();
    this.noStock = false;
    this.router.navigateByUrl(`/produtos/${id}`);
  }

  private createForm(): void {
    this.formStock = this.formBuilder.group({
      stocksize: new FormControl(null, Validators.required),
    });

    this.formShipping = this.formBuilder.group({
      shipping: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{8}$')
      ])),
    });
  }

  get validateFields(): any {
    return this.formStock.controls;
  }

  cssError(field: any): any {
    return {
      'is-invalid': field.invalid && field.touched
    };
  }

  changeImage(index: number): void {
    this.positionImage = index;
  }

  changeMax(index: number): void {
    this.sizeMax = this.productDetails.stock[index].quantity;
    this.startValue = 1;
  }

  addToCart(productDetail: ProductDetailsTO, stockIndex: number): void {
    if (this.formStock.valid) {
      const stockCart = this.productDetails.stock[stockIndex];
      const cartItem = this.cartService.getProductsCart().find(item => item.id === stockCart.id);
      if (cartItem) {
        const sumQuantity = cartItem.quantity + 1;
        if (sumQuantity > stockCart.quantity) {
          this.noStock = true;
        } else {
          this.noStock = false;
          this.sendToCart(productDetail, stockCart);
        }
      } else {
        this.sendToCart(productDetail, stockCart);
      }
      if (!this.noStock) {
        this.formStock.reset();
        this.dialogSuccess.title = 'Adicionado ao carrinho!';
        this.dialogSuccess.fire();
      }
    } else {
      this.verifyValidation(this.formStock);
    }

  }

  verifyValidation(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((item, i) => {
      const controle = formGroup.get(item);
      // @ts-ignore
      controle.markAllAsTouched();
      if (controle instanceof FormGroup) {
        this.verifyValidation(controle);
      }
    });
  }

  sendToCart(productDetail: ProductDetailsTO, stockCart: Stock): void {
    const itemCart = {
      id: stockCart.id,
      productDetails: productDetail,
      productId: this.product.id,
      model: this.product.model,
      quantity: this.startValue,
      stock: stockCart,
      total: productDetail.sale ?
        (productDetail.price * this.startValue) * ((100 - productDetail.sale.percentage) / 100) :
        productDetail.price * this.startValue,
      size: this.product.size
    };
    this.cartService.addToCart(itemCart);
  }

  calculateShipping(): void {
    if (this.formShipping.valid) {
      // @ts-ignore
      const cep = this.formShipping.get('shipping').value;
      const shipping: Shipping = {
        from: {
          postal_code: environment.ME_CEP_NZ
        },
        to: {
          postal_code: cep
        },
        products: [
          {
            id: this.product.id,
            width: this.product.size.depth,
            height: this.product.size.height,
            length: this.product.size.length,
            weight: this.product.size.weight,
            insurance_value: this.productDetails.price,
            quantity: 1
          }
        ]
      };
      this.betterSendService.calculateShipping(shipping)
        .pipe(take(1))
        .subscribe(r => {
          this.hasError = false;
          this.shippingResult = r.filter(ship => !ship.error).map(map => {
            map.price = map.price + 2;
            return map;
          });
          if (this.shippingResult.length === 0) {
            this.notShipResult = true;
          } else {
            this.notShipResult = false;
          }
          this.errorShipResult = false;
        }, () => {
          this.errorShipResult = true;
        });
    } else {
      this.verifyValidation(this.formShipping);
    }
  }

  isMobile(): any {
    const userAgent = window.navigator.userAgent.toLocaleLowerCase();
    return userAgent.includes('iphone') || userAgent.includes('android');
  }

  goToProductListing(brand?: string, category?: string, gender?: Gender): void {
    this.filterService.setSearch('', brand, category, gender);
    this.router.navigateByUrl('/search');
  }

  redirect(): void {
    this.router.navigateByUrl(`produtos/${this.id}`);
  }

  getRatingsByProductId(productId: string, page: number, size: number): void {
    this.ratingService.getRatingsByProductId(productId, page, size)
      .pipe(take(1))
      .subscribe(response => {
        this.hasErrorRating = false;
        this.ratings = response.content;
        this.contentRating = response;
        this.totalRatings = this.contentRating.totalElements;
        this.paginationService.getPageRange(this.contentRating.totalElements);
        this.calculateRating();
      }, error => {
        this.hasErrorRating = true;
      });
  }

  calculateRating(): void {
    this.ratings.forEach(rating => {
      this.rating += rating.rate;
      if (this.bestRating < rating.rate) {
        this.bestRating = rating.rate;
      }
    });
    if (this.rating > 0) {
      this.rating /= this.totalRatings;
      return;
    }
    this.rating = 0;
  }

  updateIndex(index: number): void {
    this.getRatingsByProductId(this.product.id, index, 10);
    this.paginationService.page = index;
  }

}
