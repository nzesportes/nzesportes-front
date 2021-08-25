import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../../shared/services/products.service';
import {take} from 'rxjs/operators';
import {Product} from '../../../../shared/models/product.model';
import {ProductsStore} from '../../../../shared/models/products-store.model';
import {Gender} from '../../../../shared/enums/gender';
import {Router} from '@angular/router';
import {ProductDetails} from '../../../../shared/models/product-details.model';
import {Order} from '../../../../shared/enums/order.enum';
import {ProductDetailsPage} from '../../../../shared/models/pagination-model/product-details-page.model';
import {PaginationService} from '../../../../shared/services/pagination.service';

@Component({
  selector: 'app-coming-up',
  templateUrl: './coming-up.component.html',
  styleUrls: ['./coming-up.component.scss']
})
export class ComingUpComponent implements OnInit {

  // @ts-ignore
  products: Product[];
  // @ts-ignore
  productsStore: ProductsStore[];
  // @ts-ignore
  auxProductsDetails: ProductDetails[];
  productsDetails: ProductDetails[] = [];
  content: ProductDetailsPage | undefined;
  hasError!: boolean;

  constructor(
    private productsService: ProductsService,
    private paginationService: PaginationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.paginationService.initPagination();
    this.getAllDetails(8, this.paginationService.page);
  }

  getAllDetails(size: number, page: number, name?: string, gender?: Gender, category?: string,
                productSize?: string, color?: string, brand?: string, order?: Order): void {
    this.productsService.getAllDetails(size, page, name, gender, category, productSize, color, brand, order)
      .pipe(take(1))
      .subscribe(response => {
          this.productsDetails = response.content;
          this.auxProductsDetails = response.content;
          this.content = response;
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

  filter(param?: string): void {
    this.getAllDetails(8, 0, '', param === 'MALE' ? Gender.MALE : Gender.FEMALE);
  }
}
