import {Component, OnInit} from '@angular/core';
import {PaginationService} from '../../../shared/services/pagination.service';
import {Router} from '@angular/router';
import {ProductSizeService} from '../../../shared/services/product-size.service';
import {take} from 'rxjs/operators';
import {ProductSize} from '../../../shared/models/product-size.model';
import {ProductSizePage} from '../../../shared/models/pagination-model/product-size-page.model';

@Component({
  selector: 'app-measurement-chart-list',
  templateUrl: './measurement-chart-list.component.html',
  styleUrls: ['./measurement-chart-list.component.scss']
})
export class MeasurementChartListComponent implements OnInit {

  // content: ProductSizePage | undefined;
  hasError!: boolean;
  productsSize: ProductSize[] = [];

  constructor(
    private router: Router,
    public paginationService: PaginationService,
    public productSizeService: ProductSizeService
  ) { }

  ngOnInit(): void {
    this.hasError = false;
    this.paginationService.initPagination();
    this.getAllMeasurementChart(10, this.paginationService.page);
  }

  getAllMeasurementChart(size: number, page: number): void {
    this.productSizeService.getAll(size, page)
      .pipe(take(1))
      .subscribe(r => {
        this.productsSize = r;
        // this.content = r;
        // this.paginationService.getPageRange(this.content.totalElements);
      }, () => {
        this.hasError = true;
      });
  }

  updateIndex(index: number): void {
    this.getAllMeasurementChart(10, index);
    this.paginationService.page = index;
  }

  redirect(): void {
    this.router.navigateByUrl('/painel/tabela-medidas');
  }
}
