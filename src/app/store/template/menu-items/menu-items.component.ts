import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {
  
  constructor() {
  }

  ngOnInit(): void {

  }

  changeStateItemMenu(itemMenu: HTMLElement): void {
    if (itemMenu.className === 'mega-menu') {
      itemMenu.className = 'mega-menu menu-opened';
    } else if (itemMenu.className === 'mega-menu menu-opened') {
      itemMenu.className = 'mega-menu';
    }
  }

}
