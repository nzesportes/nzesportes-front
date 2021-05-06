import {Component, OnInit} from '@angular/core';
import {BrandsService} from '../../shared/services/brands.service';
import {take} from 'rxjs/operators';
import {Brand} from '../../shared/models/brand.model';
import {BrandPage} from '../../shared/models/brand-page.model';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss']
})
export class BrandsListComponent implements OnInit {

  brands: Brand[] = [];
  page = 0;
  content: BrandPage | undefined;
  pages: number | undefined;
  public pageRange: any;

  constructor(
    private brandsService: BrandsService
  ) {
  }

  ngOnInit(): void {
    this.getAllBrands(10, this.page);
  }

  getAllBrands(size: number, page: number): void {
    this.brandsService.getAll(size, page)
      .pipe(take(1))
      .subscribe(r => {
        this.brands = r.content;
        this.content = r;
        this.getPageRange();
      }, () => {

      });
  }

  getPageRange(): void {
    // @ts-ignore
    this.pages = Math.ceil(this.content?.totalElements / 10);
    this.pageRange = {
      first: this.page > 2 ? this.page - 3 : 0,
      last: this.page > 2 && this.pages > this.page + 3 ? this.page + 3 :
        this.page < 3 ? 5 : this.page === this.pages ?
          this.pages : this.page + (this.pages - this.page)
    };
  }

  getRange(): any[] {
    const result = [];
    for (let i = this.pageRange.first; i < this.pageRange.last; i++) {
      result.push(i);
    }
    return result;
  }


  updateIndex(index: number): void {
    this.getAllBrands(10, index);
    this.page = index;
  }


}
