import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {map, take} from 'rxjs/operators';
import {ProductsService} from '../../../../shared/services/products.service';
import {Gender} from '../../../../shared/enums/gender';
import {Order} from '../../../../shared/enums/order.enum';
import {PaginationService} from '../../../../shared/services/pagination.service';
import {Router} from '@angular/router';
import {ProductDetailsTOPage} from '../../../../shared/models/pagination-model/product-details-to-page.model';
import {ProductDetailsTO} from '../../../../shared/models/product-details-to.model';
import {FiltersService} from '../../../services/filters.service';


@Component({
  selector: 'app-nz-store',
  templateUrl: './nz-store.component.html',
  styleUrls: ['./nz-store.component.scss']
})
export class NzStoreComponent implements OnInit {
  productDetailsTO: ProductDetailsTO[] = [];
  content: ProductDetailsTOPage | undefined;
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
    private router: Router,
    private filterService: FiltersService
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
        localStorage.setItem('product', JSON.stringify(product));
        this.hasError = false;
      }, error => {
        console.log(error);
        this.hasError = true;
      });
    this.router.navigateByUrl('/produtos/' + idProductDetails);
  }

  goToProductListing(brand?: string, category?: string, gender?: Gender): void {
    this.filterService.setSearch('', brand, category, gender);
    this.router.navigateByUrl('/search');
  }
}
