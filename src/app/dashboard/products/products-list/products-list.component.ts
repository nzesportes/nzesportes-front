import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BrandsService} from '../../../shared/services/brands.service';
import {CategoriesService} from '../../../shared/services/categories.service';
import {zip} from 'rxjs';
import {take} from 'rxjs/operators';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Router} from '@angular/router';
import {ProductsService} from '../../../shared/services/products.service';
import {CategoryPage} from '../../../shared/models/pagination-model/category-page.model';
import {Product} from '../../../shared/models/product.model';
import {ProductPage} from '../../../shared/models/pagination-model/product-page.model';

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
  page = 0;
  content: ProductPage | undefined;
  pages: number | undefined;
  public pageRange: any;
  hasError!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.verifyHasBrandsCategories();
    this.getAllProduct(10, this.page);
  }

  getAllProduct(size: number, page: number): void {
    this.productsService.getAll(size, page)
      .pipe(take(1))
      .subscribe(r => {
        this.products = r.content;
        this.content = r;
        this.getPageRange();
      }, () => {
        this.hasError = true;
      });
  }

  getPageRange(): void {
    // @ts-ignore
    this.pages = Math.ceil(this.content?.totalElements / 10);

    this.pageRange = {
      first: this.page > 2 ? this.page - 3 : 0,
      last: this.page > 2 && this.pages > this.page + 3 ? this.page + 3 :
        this.page < 3 && this.pages >= 5 ? 5 :
          this.page === this.pages || this.pages < 5 ?
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
    this.getAllProduct(10, index);
    this.page = index;
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
        if (brands.content.length === 0 && categories.content.length === 0) {
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
