import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as ProductActions from './cart.actions';
import {ItemCart} from '../../models/item-cart';

export const productsFeatureKey = 'products';

export interface ProductState extends EntityState<ItemCart> {
  isLoading: boolean;
  error: string | null;
  total: number;
}

export const adapter: EntityAdapter<ItemCart> = createEntityAdapter<ItemCart>();

export const initialState: ProductState = adapter.getInitialState({
  isLoading: true,
  error: null,
  total: 0
});

export const reducer = createReducer(
  initialState,
  on(ProductActions.addProduct,
    (state, action) => adapter.addOne(action.product, state)
  ),
  on(ProductActions.updateProduct,
    (state, action) => adapter.updateOne(action.product, state)
  ),
  on(ProductActions.deleteProduct,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ProductActions.loadProducts,
    (state, action) =>  adapter.setAll(action.products, {
      ...state,
      isLoading: false,
      total: action.total
    })
  ),
  on(ProductActions.requestLoadProducts,
    (state, action) => adapter.setAll([], {
      ...state,
      isLoading: true
    })
  ),
  on(ProductActions.updateTotalBalance,
    (state, action) => adapter.setAll([], {
      ...state,
      isLoading: true,
      total: action.total
    })
  )
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectIsLoading = (state: ProductState) => state.isLoading;
export const selectError = (state: ProductState) => state.error;
export const selectTotalBalance = (state: ProductState) => state.total;


