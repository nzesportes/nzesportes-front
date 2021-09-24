import {Component, OnInit} from '@angular/core';
import {NavBarService} from '../../../services/nav-bar.service';
import {CartService} from '../../../services/cart.service';
import {FiltersService} from '../../../services/filters.service';
import {Router} from '@angular/router';
import {ProductsService} from '../../../../shared/services/products.service';
import {Observable} from 'rxjs';
import {ItemCart} from '../../../models/item-cart';
import * as fromSelector from '../../../redux/cart/cart.selectors';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isSidebarOpened = false;
  search = '';
  products$!: Observable<ItemCart[]>;
  totalItems = 0;

  constructor(
    private navbarService: NavBarService,
    private cartService: CartService,
    private filterService: FiltersService,
    private router: Router,
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.products$ = this.store.select(fromSelector.products);
    this.navbarService.sidebarState.subscribe(response => {
      this.isSidebarOpened = response;
    });
    this.getTotalItems();
  }

  changeStateSidebar(): void {
    this.navbarService.changeSidebarState();
  }

  searchProducts(): void {
    this.filterService.setSearch(this.search);
    this.router.navigateByUrl('/search');
  }

  getTotalItems(): void {
    this.products$.subscribe(product => {
      this.totalItems = 0;
      product.forEach(item => {
        this.totalItems += item.quantity;
      });
    });
  }
}
