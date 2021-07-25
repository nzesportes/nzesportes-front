import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {catchError, delay, map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {ProductsService} from '../../../shared/services/products.service';
import {addProduct, loadProducts, requestLoadProducts, searchProduct} from './cart.actions';
import {CartService} from '../../services/cart.service';

@Injectable()
export class CartEffect {

  constructor(
    private actions$: Actions,
    private service: ProductsService,
    private cartService: CartService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLoadProducts),
      map(() =>
          loadProducts({products: this.cartService.getProductsCart()})
        )
    )
  );

  // addProcucts$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(addProduct),
  //     tap((action) =>
  //       this.cartService.addToCart(action.product)
  //     )
  //   )
  // );

  searchProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchProduct),
      switchMap(action => this.service.getAll(10, 0, '', '', action.searchQuery)
        .pipe(
          delay(1000),
          map(data => loadProducts({products: []}))
        ))
    )
  );
}
