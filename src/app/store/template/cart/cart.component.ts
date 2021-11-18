import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Observable, of, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';


import * as fromActions from '../../redux/cart/cart.actions';
import * as fromStore from '../../redux/cart/cart.reducer';
import * as fromSelector from '../../redux/cart/cart.selectors';
import {ItemCart} from '../../models/item-cart';
import {LoaderService} from '../../../shared/services/loader.service';
import {CouponService} from '../../../shared/services/coupon.service';
import {CouponTO} from '../../../shared/models/coupon-to.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  emptyCart = false;

  items = [
    {
      id: 0,
      img: '',
      name: '',
      price: 0.00,
      qtde: 0
    }
  ];

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  products$!: Observable<ItemCart[]>;
  total$!: Observable<number>;

  isLoadingSubscription$!: Subscription;
  loading = false;
  isValidCoupon = false;
  isNotFoundError = false;
  isUndefinedError = false;
  hasCouponError = false;
  isExpiredCoupon = false;
  promocodeSessionStorage: any;
  coupon = '';
  discount = 0;

  constructor(
    private cartService: CartService,
    private store: Store<fromStore.ProductState>,
    private loaderService: LoaderService,
    private couponService: CouponService
  ) {
  }

  ngOnInit(): void {
    this.promocodeSessionStorage = sessionStorage.getItem('coupon');
    if (this.promocodeSessionStorage) {
      this.promocodeSessionStorage = JSON.parse(this.promocodeSessionStorage);
      this.discount = this.promocodeSessionStorage.discount;
      this.checkSessionStorageCoupon(this.promocodeSessionStorage.code);
    }
    this.store.dispatch(fromActions.requestLoadProducts());
    this.products$ = this.store.select(fromSelector.products);
    this.isLoading$ = this.store.select(fromSelector.isLoading);
    this.total$ = this.store.select(fromSelector.total);

    this.error$ = this.store.select(fromSelector.error);
    this.isLoadingSubscription$ = this.isLoading$.subscribe(
      (res) => this.callLoading(res),
      () => this.callLoading(false),
      () => this.callLoading(false)
    );
  }

  callLoading(loading: boolean): void {
    this.loading = loading;
    this.loaderService.isLoading.next(this.loading);
  }

  addQuantityCart(idCart: string, quantity: number): void {
    this.cartService.addQuantityCart(idCart, quantity);
  }

  removeItemCart(id: string): void {
    this.cartService.removeItemCart(id);
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription$.unsubscribe();
  }

  checkAvailability(promocode: string): void {
    this.hasCouponError = false;
    this.isUndefinedError = false;
    this.isNotFoundError = false;
    this.isExpiredCoupon = false;
    this.discount = 0;
    if (promocode) {
      this.couponService.validate(promocode)
        .subscribe(response => {
          if (response.status) {
            this.isValidCoupon = true;
            this.discount = response.coupon.discount;
            sessionStorage.setItem('coupon', JSON.stringify(response.coupon));
            return;
          }
          this.discount = 0;
          this.hasCouponError = true;
          this.isExpiredCoupon = true;
        }, error => {
          if (error.message.error.status === 404) {
            this.discount = 0;
            this.hasCouponError = true;
            this.isNotFoundError = true;
          }
        });
      return;
    }
    this.discount = 0;
    this.isUndefinedError = true;
    this.hasCouponError = true;
    return;
  }

  checkSessionStorageCoupon(coupon: string): void {
    this.couponService.validate(coupon)
      .subscribe(response => {
        if (response.status) {
          this.coupon = coupon;
          this.discount = response.coupon.discount;
          this.isValidCoupon = true;
          sessionStorage.setItem('coupon', JSON.stringify(response.coupon));
          return;
        }
      }, error => {
        this.discount = 0;
        sessionStorage.removeItem('coupon');
      });
  }

  removeCoupon(promocode: HTMLInputElement): void {
    this.hasCouponError = false;
    this.isUndefinedError = false;
    this.isNotFoundError = false;
    this.isValidCoupon = false;
    this.isExpiredCoupon = false;
    this.discount = 0;
    promocode.value = '';
    sessionStorage.removeItem('coupon');
  }
}
