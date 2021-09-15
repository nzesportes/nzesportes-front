import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {map, take} from 'rxjs/operators';
import {ProductsStore} from '../../../../shared/models/products-store.model';
import {ProductsService} from '../../../../shared/services/products.service';
import {Product} from '../../../../shared/models/product.model';
import {Gender} from '../../../../shared/enums/gender';
import {Order} from '../../../../shared/enums/order.enum';
import {PaginationService} from '../../../../shared/services/pagination.service';
import {ProductDetails} from '../../../../shared/models/product-details.model';
import {ProductDetailsPage} from '../../../../shared/models/pagination-model/product-details-page.model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-nz-store',
  templateUrl: './nz-store.component.html',
  styleUrls: ['./nz-store.component.scss']
})
export class NzStoreComponent implements OnInit {

  // @ts-ignore
  products: Product[];
  // @ts-ignore
  productsStore: ProductsStore[];

  productsDetails: ProductDetails[] | undefined;
  content: ProductDetailsPage | undefined;
  hasError!: boolean;

  customOptions: OwlOptions = {
    loop: true,
    margin: 30,
    autoplay: false,
    autoplaySpeed: 700,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-arrow-left"></i> Anterior', 'Próxima <i class="fas fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };


  constructor(
    private productsService: ProductsService,
    private paginationService: PaginationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.paginationService.initPagination();
    this.getAllDetails(8, this.paginationService.page, '', undefined, 'nz');
  }

  getAllDetails(size: number, page: number, name?: string, gender?: Gender, category?: string,
                productSize?: string, color?: string, brand?: string, order?: Order): void {
    this.productsService.getAllDetails(size, page, name, gender, category, productSize, color, brand, order)
      .pipe(take(1))
      .subscribe(response => {
          this.productsDetails = response.content;
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
}
