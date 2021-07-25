import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {catchError, delay, map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {ProductsService} from '../../../shared/services/products.service';
import { loadProducts, requestLoadProducts, searchProduct } from './cart.actions';

@Injectable()
export class CartEffect {

  constructor(private actions$: Actions, private service: ProductsService) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLoadProducts),
      switchMap(action =>
        this.service.getAll(10, 0).pipe(
          delay(3000),
          map(data => loadProducts({products: data.content}))
        ))
    )
  );

  searchProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchProduct),
      switchMap(action => this.service.getAll(10, 0, '', '', action.searchQuery)
        .pipe(
          delay(1000),
          map(data => loadProducts({products: data.content}))
        ))
    )
  );
}
