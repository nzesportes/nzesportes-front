import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FiltersService {
  // tslint:disable-next-line:variable-name
  private _filter: any;

  constructor() {
    if (!this._filter) {
      this.setFilter({
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

  setSearch(search: string): void {
    this.filter ? this._filter.name = search : this.setFilter({
      gender: search,
      category: '',
      size: '',
      color: '',
      brand: '',
      classBy: ''
    });
  }
}
