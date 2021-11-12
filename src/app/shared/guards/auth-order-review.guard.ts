import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromSelector from '../../store/redux/cart/cart.selectors';
import {map, take} from 'rxjs/operators';
import * as fromActions from '../../store/redux/cart/cart.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthOrderReviewGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<any>

  ) {
  }

  canActivate(): Observable<boolean> | boolean {
    this.store.dispatch(fromActions.requestLoadProducts());
    return this.store.select(fromSelector.products).pipe(
      take(1),
      map(r => {
        if (r && Array.isArray(r) && r.length > 0){
          return true;
        }else {
          this.router.navigate(['carrinho']);
          return false;
        }
      })
    );
  }
}
