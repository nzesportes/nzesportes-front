import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Product, ProductUpdateTO} from '../../../shared/models/product.model';
import {ProductDetails, Stock} from '../../../shared/models/product-details.model';
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
export class NewProductComponent implements OnInit, OnDestroy {
  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  public formProduct: FormGroup = new FormGroup({});
  public formProductDetail: FormGroup = new FormGroup({});
  public formCategory: FormGroup = new FormGroup({});


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
      model: new FormControl(this.product?.model ? this.product.model : '', Validators.required),
      category: this.formBuilder.array(this.product?.category ? this.product.category : []),
      productDetails: this.formBuilder.array(this.product?.productDetails ? this.product.productDetails : [], Validators.required),
      status: new FormControl(this.product?.status ? this.product.status : false),
      brand: this.formBuilder.group({
        id: new FormControl(this.product?.brand ? this.product.brand.id : null, Validators.required),
        name: new FormControl(this.product?.brand ? this.product.brand.name : '', Validators.required),
      }),
    });
  }

  private createFormCategorie(): void {
    this.formCategory = this.formBuilder.group({
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
    return this.formCategory.get('categories') as FormArray;
  }

  getAllCategories(): void {
    this.categoriesService.getAll(300, 0)
      .pipe(take(1))
      .subscribe(result => {
        this.categories = [];
        this.categories = result.content;
        this.categoriesArrayForm.clear();
        this.categories.forEach(c => this.categoriesArrayForm.push(this.createFormArrayCategorie(c)));
      }, () => {
        this.hasError = true;
      });
  }

  initDetailForm(productDetail?: ProductDetails, index?: number): void {
    this.formProductDetail = this.createProductDetailsForm(productDetail, index);
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
      'is-invalid': field?.errors && field?.touched
    };
  }

  get productDetails(): FormArray {
    return this.formProduct.get('productDetails') as FormArray;
  }

  get productDetailsStock(): FormArray {
    return this.formProductDetail.get('stock') as FormArray;
  }

  addProductDetails(productDetails: any, indexArray?: number): void {
    if (this.product) {
      let request;
      if (productDetails.id) {
        productDetails.stockToAdd = productDetails.stock.filter((s: Stock) => s.id ? false : true);
        request = this.productService.updateProductDetails(productDetails);
      } else {
        request = this.productService.saveProductDetails(productDetails);
      }

      request
        .pipe(take(1))
        .subscribe(result => {
          if (productDetails.id) {
            const index = this.productDetails.controls.findIndex(pd => productDetails.id === pd.value.id);
            this.productDetails.at(index).setValue(result);
          } else {
            this.productDetails.insert(0, this.createProductDetailsForm(result));
          }
        }, error => {
          this.setErrorDialog(error);
          this.errorCallSaveProductDetail(productDetails);
        });
    } else {
      if (indexArray !== null && indexArray !== undefined) {
        this.productDetails.at(indexArray).get('color')?.setValue(productDetails.color);
        this.productDetails.at(indexArray).get('price')?.setValue(productDetails.price);
        this.productDetails.at(indexArray).get('status')?.setValue(productDetails.status);
        (this.productDetails.at(indexArray).get('stock') as FormArray).clear();
        productDetails.stock.forEach((s: any) =>
          (this.productDetails.at(indexArray).get('stock') as FormArray)
            .push(this.createProductDetailsStockForm(s))
        );
      } else {
        this.productDetails.insert(0, this.createProductDetailsForm(productDetails, indexArray));
      }
    }
  }


  removeProductDetails(index: number): void {
    this.productDetails.removeAt(index);
  }

  removeProductDetailsStock(index: number): void {
    this.productDetailsStock.removeAt(index);
  }

  addStock(): void {
    this.productDetailsStock.insert(0, this.createProductDetailsStockForm());
  }

  private createProductDetailsForm(productDetails?: ProductDetails, index?: number): FormGroup {
    return new FormGroup({
        id: new FormControl(productDetails ? productDetails.id : null),
        color: new FormControl(productDetails ? productDetails.color : null, Validators.required),
        price: new FormControl(productDetails ? productDetails.price : null, Validators.required),
        gender: new FormControl(productDetails ? productDetails.gender : null, Validators.required),
        description: new FormControl(productDetails ? productDetails.description : '', Validators.required),
        status: new FormControl(productDetails ? productDetails.status : false),
        productId: new FormControl(this.product ? this.product.id : ''),
        stock: this.formBuilder.array(
          productDetails?.stock ? this.createListStockForm(productDetails.stock) : [this.createProductDetailsStockForm()],
          Validators.required
        ),
        indexArray: new FormControl(index !== null && index !== undefined ? index : null)
      }
    );
  }

  createListStockForm(stocks: Stock[]): FormGroup[] {
    return stocks.map(s => this.createProductDetailsStockForm(s));
  }


  private createProductDetailsStockForm(stock?: Stock): FormGroup {
    return new FormGroup({
        id: new FormControl(stock?.id ? stock.id : null),
        size: new FormControl({value: stock ? stock.size : null, disabled: stock?.id ? true : false}, Validators.required),
        quantity: new FormControl({value: stock ? stock.quantity : null, disabled: stock?.id ? true : false}, Validators.required)
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

  setCategorie(idCategory: string): void {
    if (this.product) {
      this.productService.updateCategories(idCategory, this.product.id)
        .pipe(
          take(1)
        )
        .subscribe(() => {
          this.updateFormCategories();
        }, error => {
          this.setErrorDialog(error);
          this.errorCallSaveCategory(idCategory);
        });
    } else {
      this.updateFormCategories();
    }

  }

  updateFormCategories(): void {
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
      const productRequest: ProductUpdateTO = {
        id: this.formProduct.value.id,
        model: this.formProduct.value.model,
        status: this.formProduct.value.status
      };
      request = this.productService.update(productRequest);
    } else {
      request = this.productService.create(this.formProduct.value);
    }
    request
      .pipe(
        take(1)
      ).subscribe(() => {
      this.dialogSuccess.title = 'Produto salvo com sucesso!';
      this.dialogSuccess.fire();
    }, error => {
      this.setErrorDialog(error);
      this.errorCallSaveAgain();
    });
  }

  errorCallSaveAgain(): void {
    this.dialogError.fire().then(r => {
      if (r.isConfirmed) {
        this.save();
      }
    });
  }

  errorCallSaveProductDetail(productDetail: ProductDetails): void {
    this.dialogError.fire().then(r => {
      if (r.isConfirmed) {
        this.addProductDetails(productDetail);
      }
    });
  }

  errorCallSaveCategory(idCategory: string): void {
    this.dialogError.fire().then(r => {
      if (r.isConfirmed) {
        this.setCategorie(idCategory);
      }
    });
  }

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }

  ngOnDestroy(): void {
    this.formProduct.reset();
    this.formProductDetail.reset();
    this.formCategory.reset();
  }


}
