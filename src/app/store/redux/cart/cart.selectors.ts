import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './cart.reducer';

const productsSelector = createFeatureSelector<fromStore.ProductState>(fromStore.productsFeatureKey);

export const isLoading = createSelector(productsSelector, fromStore.selectIsLoading);
export const products = createSelector(productsSelector, fromStore.selectAll);
export const total = createSelector(productsSelector, fromStore.selectTotalBalance);

export const error = createSelector(productsSelector, fromStore.selectError);
