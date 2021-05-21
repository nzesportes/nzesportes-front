import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  emptyCart = false;
  teste = 0;

  items = [
    {
      id: 0,
      img: '',
      name: '',
      price: 0.00,
      qtde: 0
    }
  ];

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.getItemsCart();
  }

  getItemsCart(): any {
    return this.cartService.getProductsCart();
  }

  plusItem(id: number): void {
    this.cartService.plusItem(id);
  }

  minusItem(id: number): void {
    this.cartService.minusItem(id);
  }

  calculateTotal(): number {
    return this.cartService.getTotalPrice();
  }
}
