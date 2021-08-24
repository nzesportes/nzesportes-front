import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import {ItemCart} from '../../models/item-cart';


export const requestLoadProducts = createAction(
  '[Product/API] Request Load Products',
);

export const updateTotalBalance = createAction(
  '[Product/API] update Total Balance',
  props<{ total: number }>()
);

export const loadProducts = createAction(
  '[Product/API] Load Products',
  props<{ products: ItemCart[], total: number }>()
);

export const addProduct = createAction(
  '[Product/API] Add Product',
  props<{ product: ItemCart }>()
);

export const updateProduct = createAction(
  '[Product/API] Update Product',
  props<{ product: Update<ItemCart> }>()
);

export const deleteProduct = createAction(
  '[Product/API] Delete Product',
  props<{ id: string }>()
);

export const searchProduct = createAction(
  '[Product/API] Search Products',
  props<{ searchQuery: string }>()
);

