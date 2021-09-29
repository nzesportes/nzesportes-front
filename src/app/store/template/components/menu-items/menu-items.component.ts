import {Component, OnInit} from '@angular/core';
import {Gender} from '../../../../shared/enums/gender';
import {Router} from '@angular/router';
import {FiltersService} from '../../../services/filters.service';
import {MenuService} from '../../../../shared/services/menu.service';
import {Menu} from '../../../../shared/models/menu.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {

  menu: Menu = {} as Menu;
  gender = Gender;
  constructor(
    private router: Router,
    private filterService: FiltersService,
    private menuService: MenuService
  ) {
  }

  ngOnInit(): void {
    this.menuService.getMenu()
      .pipe(
        take(1)
      )
      .subscribe(menu => {
        this.menu = menu;
        this.menu.feminino = this.menu.feminino.length > 4 ? this.menu.feminino.slice(0, 3) : this.menu.feminino;
        this.menu.masculino =  this.menu.masculino.length > 4 ? this.menu.masculino.slice(0, 3) : this.menu.masculino;
        this.menu.marcas = this.menu.marcas.length > 7 ?  this.menu.marcas.slice(0, 6) : this.menu.marcas;
      });
  }

  changeStateItemMenu(itemMenu: HTMLElement): void {
    if (itemMenu.className === 'mega-menu') {
      itemMenu.className = 'mega-menu menu-opened';
    } else if (itemMenu.className === 'mega-menu menu-opened') {
      itemMenu.className = 'mega-menu';
    }
  }

  goToProductListing(brand?: string, category?: string, gender?: Gender, subCategory?: string): void {
    this.filterService.setSearch('', brand, category, gender, subCategory);
    this.router.navigateByUrl('/search');
  }

}
