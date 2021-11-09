import {Injectable} from '@angular/core';
import {ItemCart} from '../models/item-cart';
import {Store} from '@ngrx/store';
import * as fromStore from '../redux/cart/cart.reducer';
import * as fromCartActions from '../redux/cart/cart.actions';
import {environment} from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';


const USER_HASH_KEY = environment.USER_HASH_KEY;
const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: ItemCart[] = [];
  cart: any;


  constructor(
    private store: Store<fromStore.ProductState>
  ) {
  }


  getProductsCart(): ItemCart[] {
    this.cart = localStorage.getItem('cart');
    if (this.cart) {
      this.items = this.getItemEncryptKey(this.cart);
      return this.items as ItemCart[];
    }
    return [];
  }

  addToCart(itemCart: ItemCart): void {
    this.items = this.getProductsCart();
    // verificar tamanho do carrinho
    if (this.items.length === 0) {
      this.pushItemCart(itemCart);
    }else{
      // verifica se tem o productDetail
      const hasProductDetail =
        this.items.find(cart => cart.productDetails.id === itemCart.productDetails.id && itemCart.stock.id === cart.stock.id) as ItemCart;
      if (hasProductDetail) {
        // verifica se já tem aquele item de stock no carrinho
        const index  = this.items.indexOf(hasProductDetail);
        const sumQuantity =  itemCart.quantity + this.items[index].quantity;
        this.items[index].quantity = sumQuantity > itemCart.stock.quantity ? itemCart.stock.quantity : sumQuantity;
        this.items[index].total = this.items[index].quantity * itemCart.productDetails.price;
      }else {
        this.pushItemCart(itemCart);
      }
    }
    this.setItemEncryptKey();
    this.updateLoadProducts();
  }
  addQuantityCart(idCart: string, quantity: number): void {
    this.items = this.getProductsCart();
    const hasProductDetail =
      this.items.find(cart => idCart === cart.id) as ItemCart;
    if (hasProductDetail) {
      const index = this.items.indexOf(hasProductDetail);
      this.items[index].quantity = this.items[index].quantity + quantity;
      this.items[index].total = this.items[index].quantity * this.items[index].productDetails.price;
      this.setItemEncryptKey();
      this.updateLoadProducts();
    }
  }
  updateLoadProducts(): void {
    this.store.dispatch(
      fromCartActions.requestLoadProducts()
    );
  }


  pushItemCart(itemCart: ItemCart): void {
    this.items.push(itemCart);
    this.setItemEncryptKey();
  }
  setItemEncryptKey(): void {
    const cartHash = CryptoJS.AES.encrypt(JSON.stringify(this.items), USER_HASH_KEY).toString();
    localStorage.setItem(CART_KEY, cartHash);
  }

  getItemEncryptKey(cart: any): any {
    return JSON.parse(CryptoJS.AES.decrypt(cart, USER_HASH_KEY).toString(CryptoJS.enc.Utf8));
  }

  removeItemCart(id: string): void {
    this.items = this.items.filter( i => i.id !== id);
    this.setItemEncryptKey();
    this.updateLoadProducts();
  }
}
