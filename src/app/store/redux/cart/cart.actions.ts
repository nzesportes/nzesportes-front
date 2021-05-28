import {ItemCart} from '../../models/item-cart';
import {Action} from '@ngrx/store';

export enum CartActionsType {
  ADD_ITEM_CART = '[Item] Add Item',
  REMOVE_ITEM_CART = '[Item] Remove Item',
  DECREASE_ITEM_CART = '[Item] Decrease Item',
  INCREASE_ITEM_CART = '[Item] Increase item',
  CLEAR_CART = '[Cart] Clear cart'
}

export class AddItemCart {
  readonly type = CartActionsType.ADD_ITEM_CART;
  constructor(public payload: any) {}
}

export class RemoveItemCart {
  readonly type = CartActionsType.REMOVE_ITEM_CART;
  constructor(public payload: any) {}
}

export class DecreaseItemCart {
  readonly type = CartActionsType.DECREASE_ITEM_CART;
  constructor(public payload: ItemCart) {}
}

export class IncreaseItemCart {
  readonly type = CartActionsType.INCREASE_ITEM_CART;
  constructor(public payload: ItemCart) {}
}

export class ClearCart {
  readonly type = CartActionsType.CLEAR_CART;
  constructor(public payload: ItemCart) {}
}
