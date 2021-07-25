import {Injectable} from '@angular/core';
import {ItemCart} from '../models/item-cart';
import {ProductDetails, Stock} from '../../shared/models/product-details.model';
import {Product} from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: ItemCart[] = [];
  cart: any;


  constructor() {
  }


  getProductsCart(): ItemCart[] {
    this.cart = localStorage.getItem('cart');

    if (this.cart) {
      this.items = JSON.parse(this.cart);
      return this.items as ItemCart[];
    }
    return [];
  }

  addToCart(product: Product, productDetail: ProductDetails, quantity: number, stockIndex: Stock): void {
    // @ts-ignore

    let i = 0;
    this.items = this.getProductsCart();
    console.log(this.items);
    // verificar tamanho do carrinho
    if (this.items.length === 0) {
      this.pushItemCart(product, productDetail, stockIndex);
    }else{
      // percorre o carrinho caso for maior que 1
      for (i; i < this.items.length; i++){
        // se já tem o product id no carrinho
        if (product.id === this.items[i].productId){
          // verifica se tem o productDetail
          if (this.items[i].productDetails.id === productDetail.id) {
            // verifica se já tem aquele item de stock no carrinho
            if (stockIndex.id === this.items[i].stock.id){
              const sumQuantity =  quantity + this.items[i].quantity;
              this.items[i].quantity = sumQuantity > stockIndex.quantity ? stockIndex.quantity : sumQuantity;
              this.items[i].total = this.items[i].quantity * productDetail.price;
              break;
            } else {
              this.pushItemCart(product, productDetail, stockIndex);
              break;
            }
          } else {
            this.pushItemCart(product, productDetail, stockIndex);
            break;
          }
        }else{
          this.pushItemCart(product, productDetail, stockIndex);
          break;
        }
      }

    }
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  pushItemCart(product: Product, productDetail: ProductDetails, stockProduct: Stock): void {
    const itemCart = {
      id: productDetail.id,
      productDetails: productDetail,
      productId: product.id,
      model: product.model,
      quantity: 1,
      stock: stockProduct,
      total: productDetail.price
    };
    this.items.push(itemCart);
  }

  removeItemCart(id: number): void {
  }

  clearCart(): void {

  }

  refreshCart(): void {

  }

  minusItem(id: number): void {
    // this.items.forEach(item => {
    //   if (item.id === id) {
    //     item.qtde--;
    //   }
    // });
    // localStorage.setItem('cart', JSON.stringify(this.items));
  }

  plusItem(id: number): void {
    // this.items.forEach(item => {
    //   if (item.id === id) {
    //     item.qtde++;
    //   }
    // });
    // localStorage.setItem('cart', JSON.stringify(this.items));
  }


  getTotalItems(): void {
    // let total = 0;
    // this.items.map(item => {
    //   total += item.qtde;
    // });
    // return total;
  }

  getTotalPrice(): void {
    // let total = 0;
    // this.items.map(item => {
    //   total += (item.qtde * item.price);
    // });
    // return total;
  }

}
