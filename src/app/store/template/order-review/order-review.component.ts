import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {AddressService} from '../../../shared/services/address.service';
import {Address} from '../../../shared/models/address.model';
import {Observable} from 'rxjs';
import {ItemCart} from '../../models/item-cart';
import {PurchaseService} from '../../../shared/services/purchase.service';
import {Store} from '@ngrx/store';
import * as fromActions from '../../redux/cart/cart.actions';
import * as fromSelector from '../../redux/cart/cart.selectors';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {

  isLogged = false;
  addresses: Address[] | undefined;
  products$!: Observable<ItemCart[]>;
  total$!: Observable<number>;
  isLoading$!: Observable<boolean>;

  constructor(
    private tokenStorageService: TokenStorageService,
    private addressService: AddressService,
    private purchase: PurchaseService,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fromActions.requestLoadProducts());
    this.products$ = this.store.select(fromSelector.products);
    this.total$ = this.store.select(fromSelector.total);
    this.isLoading$ = this.store.select(fromSelector.isLoading);
    this.getAddressesByUser();
    this.isLogged = this.tokenStorageService.isLoggedIn();
  }

  getAddressesByUser(): void {
    this.addressService.getByUser()
      .subscribe(response => {
        this.addresses = response;
      }, error => {
        console.log(error);
      });
  }

}
