import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../../../shared/services/products.service';
import {Gender} from '../../../../shared/enums/gender';
import {Order} from '../../../../shared/enums/order.enum';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  formFilters!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService

  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formFilters = this.formBuilder.group({
      gender: [''],
      category: [''],
      size: [''],
      color: [''],
      brand: [''],
      classBy: ['']
    });
  }

  teste(): void {
    this.productsService.setDetailsFiltersState(
      this.formFilters?.get('gender')?.value as Gender,
      this.formFilters?.get('category')?.value,
      this.formFilters?.get('size')?.value,
      this.formFilters?.get('color')?.value,
      this.formFilters?.get('brand')?.value,
      this.formFilters?.get('classBy')?.value as Order
    );
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
