import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../services/cart.service';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {ItemCart} from '../../../models/item-cart';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss']
})
export class CartPreviewComponent implements OnInit {

  items: ItemCart[] = [];

  teste$: Observable<any>;

  qtdeTotal = 0;
  priceTotal = 0.00;

  constructor(
    private cartService: CartService,
    private store: Store<any>
  ) {
    this.teste$ = of([]);
  }

  ngOnInit(): void {
    // this.getItemsCart();
  }

  // getItemsCart(): void {
  //   this.items = this.cartService.getProductsCart();
  //   this.getTotal();
  // }
  //
  // getTotal(): void {
  //   this.qtdeTotal = this.cartService.getTotalItems();
  //   this.priceTotal = this.cartService.getTotalPrice();
  // }

}
