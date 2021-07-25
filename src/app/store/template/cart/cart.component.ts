import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';


import * as fromActions from '../../redux/cart/cart.actions';
import * as fromStore from '../../redux/cart/cart.reducer';
import * as fromSelector from '../../redux/cart/cart.selectors';
import {ItemCart} from '../../models/item-cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

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

  constructor(
    private cartService: CartService,
    private store: Store<fromStore.ProductState>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(fromActions.requestLoadProducts());
    this.products$ = this.store.select(fromSelector.products);
    this.isLoading$ = this.store.select(fromSelector.isLoading);
    this.error$ = this.store.select(fromSelector.error);
    this.store.select(fromSelector.products).subscribe(r => {
      console.log(r);
    })
  }

  plusItem(id: number): void {
    this.cartService.plusItem(id);
  }

  minusItem(id: number): void {
    this.cartService.minusItem(id);
  }

  // calculateTotal(): number {
  //   return this.cartService.getTotalPrice();
  // }
}
