import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Observable, of, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';


import * as fromActions from '../../redux/cart/cart.actions';
import * as fromStore from '../../redux/cart/cart.reducer';
import * as fromSelector from '../../redux/cart/cart.selectors';
import {ItemCart} from '../../models/item-cart';
import {LoaderService} from '../../../shared/services/loader.service';

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

  constructor(
    private cartService: CartService,
    private store: Store<fromStore.ProductState>,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(fromActions.requestLoadProducts());
    this.products$ = this.store.select(fromSelector.products);
    this.isLoading$ = this.store.select(fromSelector.isLoading);
    this.total$ = this.store.select(fromSelector.total);

    this.error$ = this.store.select(fromSelector.error);
    this.isLoading$.subscribe(
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

  // calculateTotal(): number {
  //   return this.cartService.getTotalPrice();
  // }
}
