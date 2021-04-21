import {Component, HostListener, OnInit} from '@angular/core';
import {NavBarService} from '../service/nav-bar.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  isSidebarOpened = false;

  constructor(
    private navbarService: NavBarService
  ) { }

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
}
