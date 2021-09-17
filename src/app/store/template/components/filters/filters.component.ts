import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../../../shared/services/products.service';
import {Gender} from '../../../../shared/enums/gender';
import {Order} from '../../../../shared/enums/order.enum';
import {FiltersService} from '../../../services/filters.service';
import {BrandsService} from '../../../../shared/services/brands.service';
import {take} from 'rxjs/operators';
import {Brand} from '../../../../shared/models/brand.model';
import {BrandPage} from '../../../../shared/models/pagination-model/brand-page.model';
import {PaginationService} from '../../../../shared/services/pagination.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {

  formFilters!: FormGroup;
  verifyFilters = false;
  brands: Brand[] = [];
  content!: BrandPage;
  hasError = false;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private filterService: FiltersService,
    private brandsService: BrandsService,
    private paginationService: PaginationService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.verifyFilters = this._verifyFilters();
    this.getBrands();
  }

  ngOnDestroy(): void {
    this.filterService.setFilter(this.formFilters.value);
  }

  createForm(): void {
    this.formFilters = this.formBuilder.group({
      gender: [this.filterService.filter?.gender ? this.filterService.filter.gender : ''],
      category: [this.filterService.filter?.category ? this.filterService.filter.category : ''],
      size: [this.filterService.filter?.size ? this.filterService.filter.size : ''],
      color: [this.filterService.filter?.color ? this.filterService.filter.color : ''],
      brand: [this.filterService.filter?.brand ? this.filterService.filter.brand : ''],
      classBy: [this.filterService.filter?.classBy ? this.filterService.filter.classBy : '']
    });
  }

  sendDetailsFilters(): void {
    this.productsService.setDetailsFiltersState(
      this.filterService.filter.name,
      this.formFilters?.get('gender')?.value as Gender,
      this.formFilters?.get('category')?.value,
      this.formFilters?.get('size')?.value,
      this.formFilters?.get('color')?.value,
      this.formFilters?.get('brand')?.value,
      this.formFilters?.get('classBy')?.value as Order
    );
  }

  selectFilter(): void {
    this.sendDetailsFilters();
    this.verifyFilters = this._verifyFilters();
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

  private _verifyFilters(): boolean {
    if (this.formFilters.get('gender')?.value === '' && this.formFilters.get('category')?.value === ''
      && this.formFilters.get('size')?.value === '' && this.formFilters.get('color')?.value === ''
      && this.formFilters.get('brand')?.value === '') {
      return false;
    }
    return true;
  }

  removeFilter(filter: string): void {
    this.formFilters.get(filter)?.setValue('');
    this.sendDetailsFilters();
    this.verifyFilters = this._verifyFilters();
  }

  removeAll(): void {
    this.formFilters.get('gender')?.setValue('');
    this.formFilters.get('category')?.setValue('');
    this.formFilters.get('size')?.setValue('');
    this.formFilters.get('color')?.setValue('');
    this.formFilters.get('brand')?.setValue('');
    this.sendDetailsFilters();
    this.verifyFilters = this._verifyFilters();
  }

  getBrands(): void {
    this.brandsService.getAll(10, 0)
      .pipe(take(1))
      .subscribe(response => {
        this.brands = response.content;
        this.content = response;
        this.paginationService.getPageRange(this.content.totalElements);
        this.hasError = false;
      }, error => {
        console.log(error);
      });
  }
}
