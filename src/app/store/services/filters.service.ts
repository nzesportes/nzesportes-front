import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FiltersService {
  // tslint:disable-next-line:variable-name
  private _filter: any;

  setFilter(filter: any): void {
    this._filter = filter;
  }

  get filter(): any {
    return this._filter;
  }

}
