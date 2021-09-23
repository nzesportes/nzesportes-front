import {Component, ElementRef, OnInit} from '@angular/core';
import {Gender} from '../../../../shared/enums/gender';
import {Router} from '@angular/router';
import {FiltersService} from '../../../services/filters.service';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {

  constructor(
    private router: Router,
    private filterService: FiltersService
  ) {
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

  goToProductListing(brand?: string, category?: string, gender?: Gender): void {
    this.filterService.setSearch('', brand, category, gender);
    this.router.navigateByUrl('/search');
  }

}
