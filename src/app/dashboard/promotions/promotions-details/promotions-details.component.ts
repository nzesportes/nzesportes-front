import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Sale} from '../../../shared/models/sale.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {map, take} from 'rxjs/operators';
import {SalesService} from '../../../shared/services/sales.service';
import {ErrorWarning} from '../../../shared/models/error-warning.model';
import {Gender} from '../../../shared/enums/gender';
import {Order} from '../../../shared/enums/order.enum';
import {ProductsService} from '../../../shared/services/products.service';
import {PaginationService} from '../../../shared/services/pagination.service';
import {ProductDetailsTO} from '../../../shared/models/product-details-to.model';
import {ProductDetailsTOPage} from '../../../shared/models/pagination-model/product-details-to-page.model';

@Component({
  selector: 'app-promotions-details',
  templateUrl: './promotions-details.component.html',
  styleUrls: ['./promotions-details.component.scss']
})
export class PromotionsDetailsComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;
  hasError = false;
  id = '';
  sale!: Sale;
  productDetailsTO: ProductDetailsTO[] = [];
  auxProductsDetailsTO: ProductDetailsTO[] = [];
  content!: ProductDetailsTOPage;
  productSelected: ProductDetailsTO | undefined;

  public formBrand: FormGroup = new FormGroup({});
  loaded = true;

  constructor(
      private activatedRoute: ActivatedRoute,
      // tslint:disable-next-line:no-shadowed-variable
      private salesService: SalesService,
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private productsService: ProductsService,
      public paginationService: PaginationService
  ) {
  }

  ngOnInit(): void {
    this.hasError = false;
    this.loaded = false;
    if (this.router.url.includes('promocoes/detalhes')) {
      this.route.params.pipe(
          map(p => p.id)
      ).subscribe(id => {
        this.salesService.getById(id)
            .pipe(take(1))
            .subscribe((c: Sale) => {
              this.sale = c;
              this.loaded = true;
              this.getProductById();
              this.createForm();
            }, () => {
              this.hasError = true;
            });
      });
    }else{
      this.loaded = true;
      this.createForm();
    }
  }

  private createForm(): void {
    this.formBrand = this.formBuilder.group({
      id: new FormControl(this.sale?.id ? this.sale.id : null),
      endDate: new FormControl(this.sale?.endDate ? this.sale.endDate : '', Validators.required),
      percentage: new FormControl(this.sale?.percentage ? this.sale.percentage : '', Validators.required),
      startDate: new FormControl(this.sale?.startDate ? this.sale.startDate : '', Validators.required),
      status: new FormControl(this.sale?.status ? this.sale.status : ''),
      productDetailId: new FormControl(this.sale?.status ? this.sale.status : '')
    });
    if (this.sale && this.sale.id) {
      // @ts-ignore
      this.formBrand.get('quantity').disable();
      // @ts-ignore
      this.formBrand.get('percentage').disable();
      // @ts-ignore
      this.formBrand.get('endDate').disable();
      // @ts-ignore
      this.formBrand.get('startDate').disable();
      // @ts-ignore
      this.formBrand.get('endDate').disable();
    }
  }

  cssError(field: any): any {
    return {
      'is-invalid': field.errors && field.touched
    };
  }

  save(): void {
    if (this.sale){
      this.sale.status = this.formBrand.value.status;
    }
    this.formBrand.get('productDetailId')?.setValue(this.productSelected?.id);
    const request = this.sale ?
        this.salesService.update(this.sale) :
        this.salesService.create(this.formBrand.value);
    request
        .pipe(take(1))
        .subscribe(() => {
          this.dialogSuccess.title = 'Marca salva com sucesso!';
          this.dialogSuccess.fire();
        }, (error: ErrorWarning) => {
          this.setErrorDialog(error);
          this.dialogError.fire().then(r => {
            if (r.isConfirmed) {
              this.save();
            }
          });
        });
  }

  redirect(): void {
    this.router.navigateByUrl('/painel/promocoes');
  }

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }

  getAllDetails(size: number, page: number, name?: string, gender?: Gender, category?: string,
                productSize?: string, color?: string, brand?: string, order?: Order,  subCategory?: string): void {
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

  updateIndex(index: number): void {
    this.getAllDetails(10, index);
    this.paginationService.page = index;
  }
  onChangeFilter(search: string): void {
    this.paginationService.page = 0;
    this.getAllDetails(10, 0, search);
  }
  alterProduct(product: ProductDetailsTO): void{
    this.productSelected = product;
  }
  getProductById(): void {
    this.productsService.getDetailById(this.sale?.productDetailId)
        .pipe(take(1))
        .subscribe(r => {
          this.productSelected = r as any;
          this.productsService.getById(r.productId)
              .pipe(take(1))
              .subscribe(p => {
                // @ts-ignore
                this.productSelected?.product = p;
              }, () => this.hasError = true);
        }, () => this.hasError = true);
  }

}
