import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../services/cart.service';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {ItemCart} from '../../../models/item-cart';
import * as fromActions from '../../../redux/cart/cart.actions';
import * as fromSelector from '../../../redux/cart/cart.selectors';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss']
})
export class CartPreviewComponent implements OnInit {

  items: ItemCart[] = [];

  products$!: Observable<ItemCart[]>;
  total$!: Observable<number>;
  isLoading$!: Observable<boolean>;
  totalItems = 0;

  constructor(
    private cartService: CartService,
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(fromActions.requestLoadProducts());
    this.products$ = this.store.select(fromSelector.products);
    this.total$ = this.store.select(fromSelector.total);
    this.isLoading$ = this.store.select(fromSelector.isLoading);
    this.getTotalItems();
  }
  removeItemCart(id: string): void {
    this.cartService.removeItemCart(id);
  }

  getTotalItems(): void {
    this.products$.subscribe(product => {
      this.totalItems = 0;
      product.forEach(item => {
        this.totalItems += item.quantity;
      });
    });
  }

}
