import {Component, OnInit} from '@angular/core';
// @ts-ignore
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  sideBarOpen = true;

  constructor() {
  }

  ngOnInit(): void {
    // Toggle Click Function
    // tslint:disable-next-line:only-arrow-functions typedef
    $('#menu-toggle').click( function(e: { preventDefault: () => void; }) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
  }
  isMobile(): boolean {
    console.log(window.innerWidth);
    const windowWidth = window.innerWidth;
    const userAgent = window.navigator.userAgent.toLocaleLowerCase();
    return userAgent.includes('iphone') || userAgent.includes('android') || windowWidth < 768;
  }



}
