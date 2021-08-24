import {Component, OnInit} from '@angular/core';
import {NavBarService} from '../../../services/nav-bar.service';
import {CartService} from '../../../services/cart.service';
import {FiltersService} from '../../../services/filters.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isSidebarOpened = false;
  search = '';
  constructor(
    private navbarService: NavBarService,
    private cartService: CartService,
    private filterService: FiltersService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // this.getTotalItemsCart();

    this.navbarService.sidebarState.subscribe(response => {
      this.isSidebarOpened = response;
    });
  }

  changeStateSidebar(): void {
    this.navbarService.changeSidebarState();
  }
  searchProducts(): void {
    this.filterService.setSearch(this.search);
    this.router.navigateByUrl('/search');
  }


  // getTotalItemsCart(): number {
  //   return this.cartService.getTotalItems();
  // }

}
