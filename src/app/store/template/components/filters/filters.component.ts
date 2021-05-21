import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  changeStateItemMenu(itemMenu: HTMLElement): void {
    if (itemMenu.className === 'submenu') {
      itemMenu.className = 'submenu menu-opened';
    } else if (itemMenu.className === 'submenu menu-opened') {
      itemMenu.className = 'submenu';
    }
  }

  changeStateOrderBy(itemMenu: HTMLElement): void {
    if (itemMenu.className === 'submenu order-by') {
      itemMenu.className = 'submenu menu-opened order-by';
    } else if (itemMenu.className === 'submenu menu-opened order-by') {
      itemMenu.className = 'submenu order-by';
    }
  }
}
