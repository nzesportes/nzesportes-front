import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {AddressService} from '../../../shared/services/address.service';
import {Address} from '../../../shared/models/address.model';
import {Observable} from 'rxjs';
import {ItemCart} from '../../models/item-cart';
import {PurchaseService} from '../../../shared/services/purchase.service';
import {Store} from '@ngrx/store';
import * as fromActions from '../../redux/cart/cart.actions';
import * as fromSelector from '../../redux/cart/cart.selectors';
import {take} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentTO} from '../../../shared/models/payment-to.model';
import {ShippingResult} from '../../../shared/models/shipping-result.model';
import {Shipping} from '../../../shared/models/shipping.model';
import {BetterSendService} from '../../../shared/services/better-send.service';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {

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
    shipmentId: ''
  };
  shippingResult: ShippingResult[] = [];
  indexAddress!: number;
  notShipResult = false;
  errorShipResult = false;
  public hasError = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private addressService: AddressService,
    private purchaseService: PurchaseService,
    private formBuilder: FormBuilder,
    private betterSendService: BetterSendService,
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
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
    this.paymentTO.shipmentId = this.formGoToPayment?.get('shipmentId')?.value;
    this.paymentTO.shipment = this.shipment;
    this.purchaseService.createPaymentRequest(this.paymentTO)
      .subscribe(response => {
        window.open(response.paymentUrl, '_blank');
      }, error => console.error('ERROR SERVICE', error));
  }


  calculateShipping(): void {
    if (this.formGoToPayment?.get('shipmentId')?.value) {
      const shipping: Shipping = {
        from: {
          postal_code: '02078030'
        },
        to: {
          postal_code: this.addresses[this.indexAddress].cep
        },
        products: [
          {
            id: '',
            width: 11,
            height: 17,
            length: 11,
            weight: 0.3,
            insurance_value: 10.1,
            quantity: 1
          }
        ]
      };
      this.betterSendService.calculateShipping(shipping)
        .pipe(take(1))
        .subscribe(r => {
          this.hasError = false;
          this.shippingResult = r.filter(ship => !ship.error);
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
    this.shipment = parseFloat(this.formGoToPayment?.get('shipment')?.value);
    this.getTotalPurchase();
  }
}

