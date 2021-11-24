import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../../shared/services/products.service';
import {take} from 'rxjs/operators';
import {Gender} from '../../../../shared/enums/gender';
import {Router} from '@angular/router';
import {ProductDetails} from '../../../../shared/models/product-details.model';
import {Order} from '../../../../shared/enums/order.enum';
import {PaginationService} from '../../../../shared/services/pagination.service';
import {ProductDetailsTO} from '../../../../shared/models/product-details-to.model';
import {ProductDetailsTOPage} from '../../../../shared/models/pagination-model/product-details-to-page.model';
import {FiltersService} from '../../../services/filters.service';

@Component({
  selector: 'app-coming-up',
  templateUrl: './coming-up.component.html',
  styleUrls: ['./coming-up.component.scss']
})
export class ComingUpComponent implements OnInit {
  productDetailsTO: ProductDetailsTO[] = [];
  auxProductsDetailsTO: ProductDetailsTO[] = [];
  productsDetails: ProductDetails[] = [];
  content!: ProductDetailsTOPage;
  hasError!: boolean;
  selectedFilter = 'todos';
  orderNew = Order.NEW;
  thirtyDaysAgo = new Date(Date.now() - (1000 * 60 * 60 * 24 * 30));

  constructor(
    private productsService: ProductsService,
    private paginationService: PaginationService,
    private router: Router,
    private filterService: FiltersService
  ) {
  }

  ngOnInit(): void {
    this.thirtyDaysAgo = new Date(Date.now() - (1000 * 60 * 60 * 24 * 30));
    this.orderNew = Order.NEW;
    this.paginationService.initPagination();
    this.getAllDetails(8, this.paginationService.page, '', undefined, '', '', '', '', Order.NEW);
    this.selectedFilter = 'todos';
  }

  getAllDetails(size: number, page: number, name?: string, gender?: Gender, category?: string,
                productSize?: string, color?: string, brand?: string, order?: Order, subCategory?: string): void {
    this.productsService.getAllDetails(size, page, name, gender, category, productSize, color, brand, order, subCategory)
      .pipe(take(1))
      .subscribe(response => {
          this.productDetailsTO = response.content;
          this.auxProductsDetailsTO = response.content;
          this.content = response;
          this.paginationService.getPageRange(this.content.totalElements);
          this.hasError = false;
        }, () => {
          this.hasError = true;
        }
      );
  }

  goToProductDetails(idProductDetails: string, id: string): void {
    this.productsService.getById(id)
      .pipe(take(1))
      .subscribe(product => {
        sessionStorage.setItem('product', JSON.stringify(product));
        this.hasError = false;
      }, error => {
        console.log(error);
        this.hasError = true;
      });
    this.router.navigateByUrl('/produtos/' + idProductDetails);
  }

  filter(param?: string): void {
    this.getAllDetails(8, 0, '', param === 'MALE' ? Gender.MALE : Gender.FEMALE, '', '', '', '', Order.NEW);
  }

  goToProductListing(brand?: string, category?: string, gender?: Gender): void {
    this.filterService.setSearch('', brand, category, gender, '');
    this.router.navigateByUrl('/search');
  }

  filterSelected(filter: string): void {
    this.selectedFilter = filter;
  }

  verifyDate(date: Date | undefined): boolean {
    return date && new Date(date) > this.thirtyDaysAgo ? true : false;
  }
}
