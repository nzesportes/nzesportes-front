import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../shared/services/products.service';
import {ProductDetails} from '../../../shared/models/product-details.model';
import {take} from 'rxjs/operators';
import {Order} from '../../../shared/enums/order.enum';
import {Router} from '@angular/router';
import {PaginationService} from '../../../shared/services/pagination.service';
import {ProductDetailsPage} from '../../../shared/models/pagination-model/product-details-page.model';
import {Gender} from '../../../shared/enums/gender';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  productsDetails: ProductDetails[] = [];
  content: ProductDetailsPage | undefined;
  hasError!: boolean;

  constructor(
    public paginationService: PaginationService,
    private productsService: ProductsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.paginationService.initPagination();
    this.getAllDetails(10, this.paginationService.page, undefined, '', '', '', '', Order.ASC);
  }

  getAllDetails(size: number, page: number, gender?: Gender, category?: string,
                productSize?: string, color?: string, brand?: string, order?: Order): void {
    this.productsService.getAllDetails(size, page, gender, category, productSize, color, brand, order)
      .pipe(take(1))
      .subscribe(response => {
          this.productsDetails = response.content;
          this.content = response;
          console.log(response.content);
          this.paginationService.getPageRange(this.content.totalElements);

        }, () => {
          this.hasError = true;
        }
      );
  }


  goToProductDetails(idProductDetails: string, id: string): void {
    this.productsService.getById(id)
      .pipe(take(1))
      .subscribe(product => {
        localStorage.setItem('product', JSON.stringify(product));
      });
    this.router.navigateByUrl('/produtos/' + idProductDetails);
  }

  updateIndex(index: number): void {
    this.getAllDetails(10, index, undefined, '', '', '', '', Order.ASC);
    this.paginationService.page = index;
  }
}
