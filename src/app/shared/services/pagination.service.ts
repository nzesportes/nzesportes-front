import {Injectable} from '@angular/core';


export interface PageRange {
  first: number;
  last: number;
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  public pages = 0;
  public page = 0;
  pageRange = {
    first: 0,
    last: 0
  } as PageRange;

  constructor() {
    this.pages = 0;
    this.page = 0;
    this.pageRange = {
      first: 0,
      last: 0
    };
  }


  public getRange(): any[] {
    const result = [];
    for (let i = this.pageRange.first; i < this.pageRange.last; i++) {
      result.push(i);
    }
    return result;
  }

  getPageRange(totalElements: number): void {
    this.pages = Math.ceil(totalElements / 10);

    this.pageRange = {
      first: this.page > 2 ? this.page - 3 : 0,
      last: this.page > 2 && this.pages > this.page + 3 ? this.page + 3 :
        this.page < 3 && this.pages >= 5 ? 5 :
          this.page === this.pages || this.pages < 5 ?
            this.pages : this.page + (this.pages - this.page)
    };
  }

  initPagination(): void {
    this.pages = 0;
    this.page = 0;
    this.pageRange = {
      first: 0,
      last: 0
    };
  }
}
