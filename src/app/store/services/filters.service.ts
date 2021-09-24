import {Injectable} from '@angular/core';
import {Gender} from '../../shared/enums/gender';
import {ProductsService} from '../../shared/services/products.service';

@Injectable({
  providedIn: 'root'
})

export class FiltersService {
  // tslint:disable-next-line:variable-name
  private _filter: any;

  constructor(
    private productsService: ProductsService
  ) {
    if (!this._filter) {
      this.setFilter({
        name: '',
        gender: '',
        category: '',
        size: '',
        color: '',
        brand: '',
        classBy: ''
      });
    }
  }

  setFilter(filter: any): void {
    this._filter = filter;
  }

  get filter(): any {
    return this._filter;
  }

  setSearch(search?: string, brand?: string, category?: string, gender?: Gender): void {
    this.productsService.setDetailsFiltersState(
      search ? search : '',
      gender ? gender : undefined,
      category ? category : '',
      '',
      '',
      brand ? brand : ''
    );

    this.setFilter({
      name: search ? search : '',
      gender: gender ? gender : undefined,
      category: category ? category : '',
      size: '',
      color: '',
      brand: brand ? brand : '',
      classBy: ''
    });
  }
}
