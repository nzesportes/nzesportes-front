import {Component, HostListener, OnInit} from '@angular/core';
import {NavBarService} from './services/nav-bar.service';
import {FiltersService} from './services/filters.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  isSidebarOpened = false;
  search = '';

  constructor(
    private navbarService: NavBarService,
    private filterService: FiltersService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.navbarService.sidebarState.subscribe(response => {
      this.isSidebarOpened = response;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth >= 1200) {
      this.navbarService.sidebarState.next(false);
    }
  }

  checkSidebarIsOpen(): void {
    if (this.isSidebarOpened) {
      this.navbarService.sidebarState.next(false);
    }
  }

  searchProducts(): void {
    this.filterService.setSearch(this.search);
    this.router.navigateByUrl('/search');
  }
}
