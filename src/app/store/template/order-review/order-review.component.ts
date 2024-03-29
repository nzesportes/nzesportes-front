import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {AddressService} from '../../../shared/services/address.service';
import {Address} from '../../../shared/models/address.model';
import {Observable, Subscription, zip} from 'rxjs';
import {ItemCart} from '../../models/item-cart';
import {PurchaseService} from '../../../shared/services/purchase.service';
import {Store} from '@ngrx/store';
import * as fromActions from '../../redux/cart/cart.actions';
import * as fromSelector from '../../redux/cart/cart.selectors';
import {take} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentTO} from '../../../shared/models/payment-to.model';
import {ShippingResult} from '../../../shared/models/shipping-result.model';
import {ProductShipping, Shipping} from '../../../shared/models/shipping.model';
import {BetterSendService} from '../../../shared/services/better-send.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {ErrorWarning} from '../../../shared/models/error-warning.model';
import {Router} from '@angular/router';
import {CouponService} from '../../../shared/services/coupon.service';
import {environment} from '../../../../environments/environment';
import {ProductsService} from '../../../shared/services/products.service';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit, OnDestroy {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  formGoToPayment!: FormGroup;
  isLogged = false;
  addresses: Address[] = [];
  products$!: Observable<ItemCart[]>;
  total$!: Observable<number>;
  isLoading$!: Observable<boolean>;
  total!: number;
  shipment!: number;
  voucher = 0;
  paymentTO: PaymentTO = {
    products: [],
    shipment: 0,
    shipmentId: '',
    coupon: ''
  };
  shippingResult: ShippingResult[] = [];
  indexAddress!: number;
  notShipResult = false;
  errorShipResult = false;
  public hasError = false;
  paymentUrl = '';

  promocodeSessionStorage: any;
  coupon = '';
  isValidCoupon = false;

  productsSubscription$!: Subscription;

  listProductShipment: ProductShipping[] = [];
  constructor(
    private tokenStorageService: TokenStorageService,
    private addressService: AddressService,
    private purchaseService: PurchaseService,
    private formBuilder: FormBuilder,
    private betterSendService: BetterSendService,
    private router: Router,
    private couponService: CouponService,
    private store: Store<any>,
    private productService: ProductsService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.promocodeSessionStorage = this.couponService.getCouponSession();
    if (this.promocodeSessionStorage) {
      this.coupon = this.promocodeSessionStorage.code;
      this.voucher = this.promocodeSessionStorage.discount;
      this.checkSessionStorageCoupon(this.promocodeSessionStorage.code);
    }

    this.createForm();
    this.store.dispatch(fromActions.requestLoadProducts());
    this.products$ = this.store.select(fromSelector.products);
    this.total$ = this.store.select(fromSelector.total);
    this.isLoading$ = this.store.select(fromSelector.isLoading);
    this.shipment = 0;
    this.getPaymentTO();
    this.getTotalPurchase();
    this.getAddressesByUser();
    this.isLogged = this.tokenStorageService.isLoggedIn();
    this.productsSubscription$ =
      zip(
        this.products$,
        this.isLoading$
      ).subscribe(([r, loading]) => {
        if ((!loading && !r) || (!loading && r && Array.isArray(r) && r.length === 0)) {
          this.router.navigateByUrl('/carrinho');
        }
      });
  }

  createForm(): void {
    this.formGoToPayment = this.formBuilder.group({
      shipmentId: ['', Validators.required],
      shipment: ['', Validators.required]
    });
  }

  getAddressesByUser(): void {
    this.addressService.getByUser()
      .subscribe(response => {
        this.addresses = response;
      }, error => {
        console.log(error);
      });
  }

  getPaymentTO(): void {
    this.products$
      .pipe(take(1))
      .subscribe(response => {
        response.forEach(product => {
          this.listProductShipment.push({
            id: '',
            width: product.size.depth,
            height: product.size.height,
            length: product.size.length,
            weight: product.size.weight,
            insurance_value: product.productDetails.price,
            quantity: product.quantity
          });
          this.paymentTO.products.push({
            stockId: product?.stock.id,
            quantity: product?.quantity
          });
        });
      });
  }

  getTotalPurchase(): void {
    this.total$
      .pipe(take(1))
      .subscribe(response => {
        this.total = 0;
        this.total = response + this.shipment - this.voucher;
      });
  }

  goToPayment(): void {
    if (this.checkCouponPayment(this.coupon)) {
      this.paymentTO.shipmentId = this.formGoToPayment?.get('shipmentId')?.value;
      this.paymentTO.shipment = this.shipment;
      this.paymentTO.coupon = this.coupon;

      this.products$
        .pipe(take(1))
        .subscribe(cart => {
          const request = cart.map(c => this.productService.getStockById(c.id));
          zip(
            ...request
          ).pipe(take(1))
          .subscribe(stocks => {
            const hasStock = stocks.find(s => {
              if (s.quantity < 1){
                return true;
              }
              const product = cart.find(c => c.id === s.id);
              if (product && product.quantity > s.quantity){
                return  true;
              }
              return  false;
            });
            if (!hasStock){
              this.continuePayment();
            } else {
              const procuctCart = cart.find(c => c.id === hasStock.id);
              let error: ErrorWarning ;
              if (procuctCart) {
                error  = {
                  message: 'Quantidade do produto ' + procuctCart.model + ' ' + procuctCart.productDetails.color + ' ' +  hasStock.size + ' não está mais disponível na loja, iremos remover este produto do carrinho!',
                  title: 'Quantidade do produto indisponível',
                  action: 'OK'
                };
                this.setErrorDialog(error);
                this.dialogError.fire().then(r => {
                  this.cartService.removeItemCart(hasStock.id);
                  if (r.isConfirmed) {
                    return;
                  }
                });
              }else {
                error  = {
                  message: 'Ocorreu um erro ao processar a compra',
                  title: 'Ops, ocorreu um erro',
                  action: 'tentar novamente'
                };
                this.setErrorDialog(error);
                this.dialogError.fire().then(r => {
                  if (r.isConfirmed) {
                    this.goToPayment();
                  }
                });
              }
            }
          }, error => {
            this.setErrorDialog(error);
            this.dialogError.fire().then(r => {
              if (r.isConfirmed) {
                this.goToPayment();
              }
            });
          });
        });
    } else {
      const error: ErrorWarning = {
        message: 'O cupom informado acabou ou está expirado.',
        title: 'Erro no cupom',
        action: 'OK'
      };
      this.setErrorDialog(error);
      sessionStorage.removeItem('coupon');
      this.dialogError.fire().then(r => {
        if (r.isConfirmed) {
          this.dialogError.close();
        }
      });
    }
  }
  continuePayment(): void {
    this.purchaseService.createPaymentRequest(this.paymentTO)
      .subscribe(response => {
        this.paymentUrl = response.paymentUrl;
        this.dialogSuccess.title = 'Você está sendo redirecionado para a tela de pagamento!';
        this.dialogSuccess.fire();
        setTimeout(() => {
          this.dialogSuccess.close();
          this.redirect();
        }, 5000);
      }, (error: ErrorWarning) => {
        this.setErrorDialog(error);
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.goToPayment();
          }
        });
      });
  }


  calculateShipping(): void {
    if (this.formGoToPayment?.get('shipmentId')?.value) {
      const shipping: Shipping = {
        from: {
          postal_code: environment.ME_CEP_NZ
        },
        to: {
          postal_code: this.addresses[this.indexAddress].cep
        },
        products: this.listProductShipment
      };
      this.betterSendService.calculateShipping(shipping)
        .pipe(take(1))
        .subscribe(r => {
          this.hasError = false;
          this.shippingResult = r.filter(ship => !ship.error).map(map => {
            map.price = Number(map.price) + 2;
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
          this.hasError = true;
        });
    }
  }

  getIndexAddress(index: number): void {
    this.indexAddress = index;
    this.formGoToPayment?.get('shipment')?.reset();
    this.shipment = 0;
    this.calculateShipping();
  }

  changePriceShipment(): void {
    this.shipment = parseFloat(this.formGoToPayment?.get('shipment')?.value.price);
    this.getTotalPurchase();
  }

  redirect(): void {
    if (this.paymentUrl !== '') {
      window.location.href = this.paymentUrl;
      return;
    }
    this.router.navigateByUrl('/finalizar-compra');
  }

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }

  ngOnDestroy(): void {
    this.productsSubscription$.unsubscribe();
  }

  checkSessionStorageCoupon(coupon: string): void {
    this.couponService.validate(coupon)
      .subscribe(response => {
        if (response.status) {
          this.couponService.setCouponSession(response.coupon);
          this.isValidCoupon = true;
          return;
        } else {
          this.isValidCoupon = false;
          const error: ErrorWarning = {
            message: 'O cupom informado acabou ou está expirado.',
            title: 'Erro no cupom',
            action: 'OK'
          };
          this.setErrorDialog(error);
          sessionStorage.removeItem('coupon');
          this.dialogError.fire().then(r => {
            if (r.isConfirmed) {
              this.dialogError.close();
            }
          });
        }
      }, (error: ErrorWarning) => {
        this.isValidCoupon = false;
        error.message = 'O cupom informado acabou ou está expirado.';
        error.title = 'Erro no cupom';
        this.setErrorDialog(error);
        sessionStorage.removeItem('coupon');
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.dialogError.close();
          }
        });
      });
  }

  checkCouponPayment(coupon: string): boolean {
    if (coupon) {
      this.couponService.validate(coupon)
        .pipe(take(1))
        .subscribe(response => {
          if (response.status) {
            return response.status;
          }
          this.isValidCoupon = false;
          this.voucher = 0;
          this.getTotalPurchase();
          sessionStorage.removeItem('coupon');
          return response.status;
        }, error => {
          this.isValidCoupon = false;
          this.voucher = 0;
          this.getTotalPurchase();
          sessionStorage.removeItem('coupon');
          return false;
        });
    }
    return true;
  }
}

