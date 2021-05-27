import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BrandsService} from '../../../shared/services/brands.service';
import {CategoriesService} from '../../../shared/services/categories.service';
import {zip} from 'rxjs';
import {take} from 'rxjs/operators';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Router} from '@angular/router';
import {ProductsService} from '../../../shared/services/products.service';
import {Product} from '../../../shared/models/product.model';
import {ProductPage} from '../../../shared/models/pagination-model/product-page.model';
import {PaginationService} from '../../../shared/services/pagination.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @ViewChild('warn')
  public readonly dialogWarn!: SwalComponent;
  public formSearch!: FormGroup;

  products: Product[] = [];
  content: ProductPage | undefined;
  hasError!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private router: Router,
    public paginationService: PaginationService
  ) {
  }

  ngOnInit(): void {
    this.paginationService.initPagination();
    this.createForm();
    this.verifyHasBrandsCategories();
    this.getAllProduct(10, this.paginationService.page);
  }

  getAllProduct(size: number, page: number): void {
    this.productsService.getAll(size, page)
      .pipe(take(1))
      .subscribe(r => {
        this.products = r.content;
        this.content = r;
        this.paginationService.getPageRange(this.content.totalElements);
      }, () => {
        this.hasError = true;
      });
  }


  updateIndex(index: number): void {
    this.getAllProduct(10, index);
    this.paginationService.page = index;
  }

  private createForm(): void {
    this.formSearch = this.formBuilder.group({
      search: new FormControl(null)
    });
  }

  verifyHasBrandsCategories(): void {
    zip(
      this.brandsService.getAll(300, 0),
      this.categoriesService.getAll(300, 0)
    )
      .pipe(take(1))
      .subscribe(([brands, categories]) => {
        if (brands.content.length === 0 || categories.content.length === 0) {
          this.dialogWarn.title = 'Ops, ocorreu um problema';
          this.dialogWarn.text = 'Para acessar a página de produto é necessário ter cadastrado ao menos uma categoria e marca!';
          this.dialogWarn.fire();
        }
      }, () => {

      });
  }

  redirectTo(): void {
    this.router.navigateByUrl('/painel/categorias');
  }

}
