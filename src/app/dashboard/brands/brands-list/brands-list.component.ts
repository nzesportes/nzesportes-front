import {Component, OnDestroy, OnInit} from '@angular/core';
import {BrandsService} from '../../../shared/services/brands.service';
import {take} from 'rxjs/operators';
import {Brand} from '../../../shared/models/brand.model';
import {BrandPage} from '../../../shared/models/pagination-model/brand-page.model';
import {PaginationService} from '../../../shared/services/pagination.service';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss']
})
export class BrandsListComponent implements OnInit {

  brands: Brand[] = [];
  content: BrandPage | undefined;
  hasError!: boolean;

  constructor(
    private brandsService: BrandsService,
    public paginationService: PaginationService
  ) {
  }

  ngOnInit(): void {
    this.paginationService.initPagination();
    this.getAllBrands(10, this.paginationService.page);
  }

  getAllBrands(size: number, page: number): void {
    this.brandsService.getAll(size, page)
      .pipe(take(1))
      .subscribe(r => {
        this.brands = r.content;
        this.content = r;
        this.paginationService.getPageRange(this.content.totalElements);
      }, () => {
        this.hasError = true;
      });
  }

  updateIndex(index: number): void {
    this.getAllBrands(10, index);
    this.paginationService.page = index;
  }

}
