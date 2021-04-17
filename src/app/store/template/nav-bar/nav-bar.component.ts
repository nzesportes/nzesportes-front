import { Component, OnInit } from '@angular/core';
import {NavBarService} from '../../../service/nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private navbarService: NavBarService
  ) { }

  ngOnInit(): void {
  }

  changeStateSidebar(): void {
    this.navbarService.changeSidebarState();
  }

}
