import {ItemCart} from '../../models/item-cart';

export interface CartState {
  items: ItemCart[];
}
export interface CartStateReducer {
  cart: CartState;
}
