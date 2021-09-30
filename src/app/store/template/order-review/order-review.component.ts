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

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {

  formGoToPayment!: FormGroup;
  isLogged = false;
  addresses: Address[] | undefined;
  products$!: Observable<ItemCart[]>;
  total$!: Observable<number>;
  isLoading$!: Observable<boolean>;
  total!: number;
  shipment!: number;
  voucher = 5;
  paymentTO: PaymentTO = {
    products: [],
    shipment: 0,
    shipmentId: ''
  };

  constructor(
    private tokenStorageService: TokenStorageService,
    private addressService: AddressService,
    private purchaseService: PurchaseService,
    private formBuilder: FormBuilder,
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.store.dispatch(fromActions.requestLoadProducts());
    this.products$ = this.store.select(fromSelector.products);
    this.total$ = this.store.select(fromSelector.total);
    this.isLoading$ = this.store.select(fromSelector.isLoading);
    this.shipment = 20;

    this.getPaymentTO();
    this.getTotalPurchase();
    this.getAddressesByUser();
    this.isLogged = this.tokenStorageService.isLoggedIn();
  }

  createForm(): void {
    this.formGoToPayment = this.formBuilder.group({
      shipmentId: ['', Validators.required]
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
    this.paymentTO.shipment = this.shipment;
  }

  getTotalPurchase(): void {
    this.total$
      .pipe(take(1))
      .subscribe(response => {
        this.total = response + this.shipment - this.voucher;
      });
  }

  goToPayment(): void {
    this.paymentTO.shipmentId = this.formGoToPayment?.get('shipmentId')?.value;
    console.warn('TESTANDO', this.paymentTO);
    this.purchaseService.createPaymentRequest(this.paymentTO)
      .subscribe(response => {
        window.open(response.paymentUrl, '_blank');
      }, error => console.error('ERROR SERVICE', error));
  }

}
