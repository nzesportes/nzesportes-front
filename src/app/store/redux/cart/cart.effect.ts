import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {CartActionsType} from './cart.actions';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';

@Injectable()
export class CartEffect {

  @Effect()
  addToCartEffect = this.actions.pipe(
    ofType(
      CartActionsType.ADD_ITEM_CART
    ),
    switchMap((action: any) => {
      console.log(action);
      return [];
    }));
    /*return this.actions.pipe(
      ofType(CartActionsType.ADD_ITEM_CART),
      map(payload => {
          console.log(payload);
        })
    );
  });*/

  constructor(
    private actions: Actions
  ) {
  }
}
