import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../services/cart.service';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss']
})
export class CartPreviewComponent implements OnInit {

  items = [
    {
      id: 0,
      img: '',
      name: '',
      price: 0.00,
      qtde: 0
    }
  ];

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
    this.getItemsCart();
  }

  getItemsCart(): void {
    this.items = this.cartService.getProductsCart();
    this.getTotal();
  }

  getTotal(): void {
    this.qtdeTotal = this.cartService.getTotalItems();
    this.priceTotal = this.cartService.getTotalPrice();
  }

}
