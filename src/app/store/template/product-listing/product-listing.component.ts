import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../../../shared/services/products.service';
import {ProductDetails} from '../../../shared/models/product-details.model';
import {take} from 'rxjs/operators';
import {Order} from '../../../shared/enums/order.enum';
import {Router} from '@angular/router';
import {PaginationService} from '../../../shared/services/pagination.service';
import {ProductDetailsPage} from '../../../shared/models/pagination-model/product-details-page.model';
import {Gender} from '../../../shared/enums/gender';
import {Subscription} from 'rxjs';
import {FiltersService} from '../../services/filters.service';
import {ProductDetailsTO} from '../../../shared/models/product-details-to.model';
import {ProductDetailsTOPage} from '../../../shared/models/pagination-model/product-details-to-page.model';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit, OnDestroy {

  productDetailsTO: ProductDetailsTO[] = [];
  content: ProductDetailsTOPage | undefined;
  hasError!: boolean;
  subscription!: Subscription;
  isMobile = false;
  thirtyDaysAgo = new Date(Date.now() - (1000 * 60 * 60 * 24 * 30));

  constructor(
    public paginationService: PaginationService,
    private productsService: ProductsService,
    private router: Router,
    private filterService: FiltersService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.productsService.detailsFiltersState$.subscribe(filter => {
      this.paginationService.initPagination();
      this.getAllDetails(10, this.paginationService.page, filter.name, filter.gender as Gender, filter.category, filter.size,
        filter.color, filter.brand, filter.classBy as Order);
      this.hasError = false;
    }, error => {
      console.log(error);
      this.hasError = true;
    });
    this.paginationService.initPagination();
    this.getAllDetails(10, this.paginationService.page, this.filterService.filter.name, undefined,
      this.filterService.filter.category, '', '', this.filterService.filter.brand, Order.ASC);

    this.isMobile = this.verifyWindowWidth();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth < 768) {
      this.isMobile = true;
      return;
    }
    this.isMobile = false;
  }

  verifyWindowWidth(): boolean {
    return window.innerWidth < 768 ? true : false;
  }

  getAllDetails(size: number, page: number, name?: string, gender?: Gender, category?: string,
                productSize?: string, color?: string, brand?: string, order?: Order, subCategory?: string): void {
    this.productsService.getAllDetails(size, page, name, gender, category, productSize, color, brand, order, subCategory)
      .pipe(take(1))
      .subscribe(response => {
          this.productDetailsTO = response.content;
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

  updateIndex(index: number): void {
    this.getAllDetails(
      10,
      index,
      this.filterService.filter.name,
      this.filterService.filter.gender,
      this.filterService.filter.category,
      this.filterService.filter.size,
      this.filterService.filter.color,
      this.filterService.filter.brand,
      Order.ASC
    );
    this.paginationService.page = index;
  }

  verifyDate(date: Date | undefined): boolean {
    return date && new Date(date) > this.thirtyDaysAgo ? true : false;
  }

  goToProductListing(brand?: string, category?: string, gender?: Gender): void {
    this.filterService.setSearch('', brand, category, gender, '');
    this.router.navigateByUrl('/search');
  }
}
