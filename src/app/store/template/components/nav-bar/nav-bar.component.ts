import {Component, OnInit} from '@angular/core';
import {NavBarService} from '../../../services/nav-bar.service';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isSidebarOpened = false;

  constructor(
    private navbarService: NavBarService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.getTotalItemsCart();

    this.navbarService.sidebarState.subscribe(response => {
      this.isSidebarOpened = response;
    });
  }

  changeStateSidebar(): void {
    this.navbarService.changeSidebarState();
  }


  getTotalItemsCart(): number {
    return this.cartService.getTotalItems();
  }

}
