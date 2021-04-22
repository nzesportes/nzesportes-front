import { Component, OnInit } from '@angular/core';
import {NavBarService} from '../../../service/nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isSidebarOpened = false;

  constructor(
    private navbarService: NavBarService
  ) { }

  ngOnInit(): void {
    this.navbarService.sidebarState.subscribe(response => {
      this.isSidebarOpened = response;
    });
  }

  changeStateSidebar(): void {
    this.navbarService.changeSidebarState();
  }

}
