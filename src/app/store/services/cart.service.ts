import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items = [
    {
      id: 0,
      img: '',
      name: '',
      price: 0.00,
      qtde: 0
    }
  ];
  cart: any;


  constructor() {
  }


  getProductsCart(): any {
    this.cart = localStorage.getItem('cart');

    if (this.cart) {
      this.items = JSON.parse(this.cart);
      return this.items;
    }
    return null;
  }

  addToCart(product: any): void {
    // @ts-ignore
    this.items.push(product);
    localStorage.setItem('cart', JSON.stringify(this.items));
  }


  removeItemCart(id: number): void {


    this.items.map(item => {
      if (item.id === id) {

      }
    });
  }

  clearCart(): void {

  }

  refreshCart(): void {

  }

  minusItem(id: number): void {
    this.items.forEach(item => {
      if (item.id === id) {
        item.qtde--;
      }
    });
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  plusItem(id: number): void {
    this.items.forEach(item => {
      if (item.id === id) {
        item.qtde++;
      }
    });
    localStorage.setItem('cart', JSON.stringify(this.items));
  }


  getTotalItems(): number {
    let total = 0;
    this.items.map(item => {
      total += item.qtde;
    });
    return total;
  }

  getTotalPrice(): number {
    let total = 0;
    this.items.map(item => {
      total += (item.qtde * item.price);
    });
    return total;
  }

}
