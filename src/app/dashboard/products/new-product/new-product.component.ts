import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Product} from '../../../shared/models/product.model';
import {ProductDetails} from '../../../shared/models/product-details.model';
import {BrandsService} from '../../../shared/services/brands.service';
import {map, take} from 'rxjs/operators';
import {Brand} from '../../../shared/models/brand.model';
import {Category} from '../../../shared/models/category.model';
import {CategoriesService} from '../../../shared/services/categories.service';
import {ProductsService} from '../../../shared/services/products.service';
import {ErrorWarning} from '../../../shared/models/error-warning.model';

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

  initDetailForm(): void {
    this.formProductDetail = this.createProductDetailsForm();
  }

  get validateFieldsFormProductDetail(): { [p: string]: AbstractControl } {
    return this.formProductDetail.controls;
  }

  get validateFieldsFormProduct(): { [p: string]: AbstractControl } {
    return this.formProduct.controls;
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
    this.productDetails.insert(0, this.createProductDetailsForm(productDetails));
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
        brand: this.formBuilder.group({
          id: new FormControl(productDetails ? productDetails.brand.id : null, Validators.required),
          name: new FormControl(productDetails ? productDetails.brand.name : '', Validators.required),
        }),
        gender: new FormControl(productDetails ? productDetails.gender : null, Validators.required),
        niche: new FormControl(productDetails ? productDetails.niche : null, Validators.required),
        status: new FormControl(productDetails ? productDetails.status : false),
      }
    );
  }

  setIdBrand(): void {
    const name = this.formProductDetail.get('brand')?.get('name')?.value;
    const brand = this.brands.find(b => b.name === name);
    if (brand) {
      this.formProductDetail.get('brand')?.get('id')?.setValue(brand.id);
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
    const request =
      this.product ?
        this.productService.update(this.formProduct.value) :
        this.productService.create(this.formProduct.value);
    request
      .pipe(take(1))
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
