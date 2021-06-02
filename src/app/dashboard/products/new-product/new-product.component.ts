import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Product, ProductUpdateTO} from '../../../shared/models/product.model';
import {ProductDetails, ProductDetailUpdateTO} from '../../../shared/models/product-details.model';
import {BrandsService} from '../../../shared/services/brands.service';
import {map, mergeMap, take} from 'rxjs/operators';
import {Brand} from '../../../shared/models/brand.model';
import {Category} from '../../../shared/models/category.model';
import {CategoriesService} from '../../../shared/services/categories.service';
import {ProductsService} from '../../../shared/services/products.service';
import {ErrorWarning} from '../../../shared/models/error-warning.model';
import {Observable, zip} from 'rxjs';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  public formProduct: FormGroup = new FormGroup({});
  public formProductDetail: FormGroup = new FormGroup({});
  public formCategorie: FormGroup = new FormGroup({});


  public product!: Product;
  public brands!: Brand[];
  public categories!: Category[];
  hasError!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initAllForms();
    if (this.router.url.includes('produtos/produto')) {
      this.route.params.pipe(
        map(p => p.id)
      ).subscribe(id => {
        this.productService.getById(id)
          .pipe(take(1))
          .subscribe(p => {
            this.product = p;
            this.initAllForms();
          }, () => {
            this.hasError = true;
          });
      });
    }
  }

  initAllForms(): void {
    this.createForm();
    this.createFormCategorie();
    this.initDetailForm();
    this.getAllBrands();
    this.getAllCategories();
  }

  private createForm(): void {
    this.formProduct = this.formBuilder.group({
      id: new FormControl(this.product?.id ? this.product.id : null),
      description: new FormControl(this.product?.description ? this.product.description : '', Validators.required),
      model: new FormControl(this.product?.model ? this.product.model : '', Validators.required),
      category: this.formBuilder.array(this.product?.category ? this.product.category : [], Validators.required),
      productDetails: this.formBuilder.array(this.product?.productDetails ? this.product.productDetails : [], Validators.required),
      status: new FormControl(this.product?.status ? this.product.status : false),
      brand: this.formBuilder.group({
        id: new FormControl(this.product?.brand ? this.product.brand.id : null, Validators.required),
        name: new FormControl(this.product?.brand ? this.product.brand.name : '', Validators.required),
      }),
    });
  }

  private createFormCategorie(): void {
    this.formCategorie = this.formBuilder.group({
        categories: this.formBuilder.array([]),
      }
    );
  }

  private createFormArrayCategorie(categorie: Category): FormGroup {
    let hasChecked;
    if (this.product) {
      hasChecked = this.product.category.find(c => c.id === categorie.id);
    }
    return new FormGroup({
      id: new FormControl(categorie?.id ? categorie.id : null),
      name: new FormControl(categorie?.name ? categorie.name : '', Validators.required),
      status: new FormControl(categorie?.status ? categorie.status : false),
      type: this.formBuilder.array(categorie?.type ? categorie.type : [], Validators.required),
      checked: new FormControl(hasChecked ? true : false)
    });
  }

  private setArrayCategorieProduct(categorie: Category): FormGroup {
    return new FormGroup({
      id: new FormControl(categorie?.id ? categorie.id : null),
      name: new FormControl(categorie?.name ? categorie.name : '', Validators.required),
      status: new FormControl(categorie?.status ? categorie.status : false),
      type: this.formBuilder.array(categorie?.type ? categorie.type : [], Validators.required),
    });
  }

  get categoriesArrayFormProduct(): FormArray {
    return this.formProduct.get('category') as FormArray;
  }

  get categoriesArrayForm(): FormArray {
    return this.formCategorie.get('categories') as FormArray;
  }

  getAllCategories(): void {
    this.categoriesService.getAll(300, 0)
      .pipe(take(1))
      .subscribe(result => {
        this.categories = result.content;
        this.categories.forEach(c => this.categoriesArrayForm.push(this.createFormArrayCategorie(c)));
      }, () => {
        this.hasError = true;
      });
  }

  initDetailForm(productDetail?: ProductDetails): void {
    this.formProductDetail = this.createProductDetailsForm(productDetail);
  }

  get validateFieldsFormProductDetail(): { [p: string]: AbstractControl } {
    return this.formProductDetail.controls;
  }

  get validateFieldsFormProduct(): { [p: string]: AbstractControl } {
    return this.formProduct.controls;
  }

  get validateFieldsFormBrand(): { [p: string]: AbstractControl } {
    // @ts-ignore
    return this.formProduct.get('brand').controls;
  }

  cssError(field: any): any {
    return {
      'is-invalid': field.errors && field.touched
    };
  }

  get productDetails(): FormArray {
    return this.formProduct.get('productDetails') as FormArray;
  }

  addProductDetails(productDetails: any): void {
    if (productDetails.id) {
      this.productDetails.at(0).setValue(productDetails);
    } else {
      this.productDetails.insert(0, this.createProductDetailsForm(productDetails));

    }
  }

  removeProductDetails(index: number): void {
    this.productDetails.removeAt(index);
  }

  private createProductDetailsForm(productDetails?: ProductDetails): FormGroup {
    return new FormGroup({
        id: new FormControl(productDetails ? productDetails.id : null),
        color: new FormControl(productDetails ? productDetails.color : null, Validators.required),
        size: new FormControl(productDetails ? productDetails.size : null, Validators.required),
        price: new FormControl(productDetails ? productDetails.price : null, Validators.required),
        gender: new FormControl(productDetails ? productDetails.gender : null, Validators.required),
        niche: new FormControl(productDetails ? productDetails.niche : null, Validators.required),
        status: new FormControl(productDetails ? productDetails.status : false),
        productId: new FormControl(this.product ? this.product.id : false),
      }
    );
  }

  setIdBrand(): void {
    const name = this.formProduct.get('brand')?.get('name')?.value;
    const brand = this.brands.find(b => b.name === name);
    if (brand) {
      this.formProduct.get('brand')?.get('id')?.setValue(brand.id);
    }
  }

  getAllBrands(): void {
    this.brandsService.getAll(300, 0)
      .pipe(take(1))
      .subscribe(result => {
        this.brands = result.content;
      }, () => {
        this.hasError = true;
      });
  }

  redirect(): void {
    this.router.navigateByUrl('/painel/produtos');
  }

  setCategorie(): void {
    this.categoriesArrayFormProduct.clear();
    this.categoriesArrayForm.controls.forEach(form => {
      if (form.value.checked) {
        this.categoriesArrayFormProduct.push(
          this.setArrayCategorieProduct(form.value)
        );
      }
    });
  }

  save(): void {
    let request;
    if (this.product) {
      const productDetailRequest: Observable<ProductDetailUpdateTO>[] = [];
      this.formProduct.value.productDetails.forEach((pd: ProductDetailUpdateTO) => {
        productDetailRequest.push(
          pd.id ? this.productService.updateProductDetails(pd) : this.productService.saveProductDetails(pd)
        );
      });

      const productRequest: ProductUpdateTO = {
        id: this.formProduct.value.id,
        description: this.formProduct.value.description,
        model: this.formProduct.value.model,
        status: this.formProduct.value.status
      };
      request = this.productService.update(productRequest);
      if (productDetailRequest.length > 0) {
        request = request.pipe(
          take((1)),
          mergeMap(() => {
            return zip(...productDetailRequest);
          })
        );
      }
    } else {
      request = this.productService.create(this.formProduct.value);
    }
    request
      // @ts-ignore
      .pipe(take(1))
      // @ts-ignore
      .subscribe(() => {
        this.dialogSuccess.title = 'Produto salvo com sucesso!';
        this.dialogSuccess.fire();
      }, error => {
        this.setErrorDialog(error);
        this.erroCallSaveAgain();
      });
  }

  erroCallSaveAgain(): void {
    this.dialogError.fire().then(r => {
      if (r.isConfirmed) {
        this.save();
      }
    });
  }

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }

}
