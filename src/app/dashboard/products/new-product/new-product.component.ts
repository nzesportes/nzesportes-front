import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Product, ProductUpdateTO} from '../../../shared/models/product.model';
import {ProductDetails, Stock} from '../../../shared/models/product-details.model';
import {BrandsService} from '../../../shared/services/brands.service';
import {map, take} from 'rxjs/operators';
import {Brand} from '../../../shared/models/brand.model';
import {ProductsService} from '../../../shared/services/products.service';
import {ErrorWarning} from '../../../shared/models/error-warning.model';
import {SubCategoriesService} from '../../../shared/services/sub-categories.service';
import {SubCategory} from '../../../shared/models/sub-category.model';

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
  public formCategoryList: FormGroup = new FormGroup({});


  public product!: Product;
  public brands!: Brand[];
  public subCategoies: SubCategory[] = [];
  hasError!: boolean;

  addQuantity = '';

  constructor(
    private formBuilder: FormBuilder,
    private brandsService: BrandsService,
    private subCategoriesService: SubCategoriesService,
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.hasError = false;
    this.createFormCategories();
    this.initAllForms();
    if (this.router.url.includes('produtos/produto')) {
      this.route.params.pipe(
        map(p => p.id)
      ).subscribe(id => {
        this.productService.getById(id)
          .pipe(take(1))
          .subscribe(p => {
            this.product = p;
            console.log(this.product);
            this.initAllForms();
          }, () => {
            this.hasError = true;
          });
      });
    }
    this.getSubCategories();
  }

  initAllForms(): void {
    this.createForm();
    this.initDetailForm();
    this.getAllBrands();
    this.createFormCategories();
  }

  private createForm(): void {
    this.formProduct = this.formBuilder.group({
      id: new FormControl(this.product?.id ? this.product.id : null),
      model: new FormControl(this.product?.model ? this.product.model : '', Validators.required),
      productDetails: this.formBuilder.array(this.product?.productDetails ? this.product.productDetails : [], Validators.required),
      status: new FormControl(this.product?.status ? this.product.status : false),
      brand: this.formBuilder.group({
        id: new FormControl(this.product?.brand ? this.product.brand.id : null, Validators.required),
        name: new FormControl(this.product?.brand ? this.product.brand.name : '', Validators.required),
      }),
    });
  }

  initDetailForm(productDetail?: ProductDetails, index?: number): void {
    this.categoriesArrayForm.clear();
    console.log(this.formCategoryList.value);
    this.formProductDetail = this.createProductDetailsForm(productDetail, index);
    console.log(productDetail);
    if (this.product) {
      const result = productDetail ? productDetail.subCategories.map(sub => sub.id) as string[] : [];
      this.subCategoies.forEach(c  => {
       if (result.includes(c.id)){
         console.log('entrou');
         this.categoriesArrayForm.push(this.createFormArrayCategorieUpdate(c, true));
       }else{
         this.categoriesArrayForm.push(this.createFormArrayCategorieUpdate(c, false));
       }
      });
    }else {
      this.subCategoies.forEach(c => this.categoriesArrayForm.push(this.createFormArrayCategorie(c, productDetail?.subCategories)));
    }
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

  CustomizeCssError(field: any, actualQuantity: string): any {
    return {
      'is-invalid': field?.touched && field?.value === null
        || field?.value === 0
        || this.convertToPositiveNumber(field.value) > this.convertToNumber(actualQuantity)
    };
  }

  isValidUpdateStock(field: any, actualQuantity: string): boolean {
    return field?.value !== null
      && field?.value !== 0
      && this.convertToPositiveNumber(field.value) < this.convertToNumber(actualQuantity);
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

      productDetails.subCategoriesToAdd = this.categoriesArrayForm.controls.filter(c => c.value.checked).map(form => form.value.id);
      if (productDetails.id) {
        productDetails.subCategoriesToRemove = this.categoriesArrayForm.controls.filter(c => !c.value.checked).map(form => form.value.id);
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
        (this.productDetails.at(indexArray).get('subCategories') as FormArray).clear();

        this.categoriesArrayForm.controls.forEach(form => {
          if (form.value.checked) {
            (this.productDetails.at(indexArray).get('subCategories') as FormArray).push(
              this.createFormArraySubCategoryDetails(form.value)
            );
          }
        });
        this.productDetails.at(indexArray).get('color')?.setValue(productDetails.color);
        this.productDetails.at(indexArray).get('price')?.setValue(productDetails.price);
        this.productDetails.at(indexArray).get('status')?.setValue(productDetails.status);
        (this.productDetails.at(indexArray).get('stock') as FormArray).clear();
        productDetails.stock.forEach((s: any) =>
          (this.productDetails.at(indexArray).get('stock') as FormArray)
            .push(this.createProductDetailsStockForm(s))
        );
      } else {
        productDetails.subCategories = this.categoriesArrayForm.controls.filter(c => c.value.checked);
        this.productDetails.insert(0, this.createProductDetailsForm(productDetails, indexArray));
      }
      console.log(this.formProduct.value);
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
        description: new FormControl(productDetails ? productDetails.description : '', Validators.required),
        status: new FormControl(productDetails ? productDetails.status : false),
        productId: new FormControl(this.product ? this.product.id : ''),
        subCategories: this.formBuilder.array(productDetails?.subCategories ? productDetails.subCategories : []),
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
        size: new FormControl(stock ? stock.size : null, Validators.required),
        quantity: new FormControl(stock ? stock.quantity : null, Validators.required),
        updateStock: new FormControl(),
        quantityAdd: new FormControl(null)
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
    this.brandsService.getAll(100, 0)
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

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }

  ngOnDestroy(): void {
    this.formProduct.reset();
    this.formProductDetail.reset();
  }

  updateStock(stock: Stock, pDetailId: string, quantity: string, index: number): void {
    const updateStock = {
      id: stock.id,
      productDetailId: pDetailId,
      quantityToAdd: Number(quantity)
    };
    this.productService.updateStock(updateStock)
      .pipe(take(1))
      .subscribe(r => {
        this.productDetailsStock.at(index).get('quantity')?.setValue(r.quantity);
        this.productDetailsStock.at(index).get('updateStock')?.setValue(null);
      }, error => {
        this.setErrorDialog(error);
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.updateStock(stock, pDetailId, quantity, index);
          }
        });
      });
  }

  convertToNumber(n: string): number {
    return Number(n);
  }

  convertToPositiveNumber(n: string): number {
    return Number(n) * -1;
  }

  private createFormCategories(): void {
    this.formCategoryList = this.formBuilder.group({
        categories:  this.formBuilder.array([]),
      }
    );
  }

  get categoriesArrayForm(): FormArray {
    return this.formCategoryList.get('categories') as FormArray;
  }

  getSubCategories(): void {
    this.subCategoriesService.getAll(100, 0)
      .pipe(take(1))
      .subscribe(r => {
        this.subCategoies = r.content;
        this.createFormCategories();
      }, () => {
        this.hasError = true;
      });
  }

  private createFormArrayCategorie(subCategory: SubCategory, detailsSubCategory?: SubCategory[]): FormGroup {
    let hasChecked;
    if (detailsSubCategory) {
      hasChecked = detailsSubCategory.find(c => c.id === subCategory.id);
    }
    return this.createFormArrayCategorieUpdate(subCategory, hasChecked ? true : false);
  }
  private createFormArrayCategorieUpdate(subCategory: SubCategory, hasChecked: boolean): FormGroup {
    return new FormGroup({
      id: new FormControl(subCategory?.id ? subCategory.id : null),
      name: new FormControl(subCategory?.name ? subCategory.name : '', Validators.required),
      status: new FormControl(subCategory?.status ? subCategory.status : false),
      gender: new FormControl(subCategory?.gender ? subCategory.gender : false),
      categories: this.formBuilder.array(subCategory?.categories ? subCategory.categories : []),
      checked: new FormControl(hasChecked ? true : false)
    });
  }

  private createFormArraySubCategoryDetails(subCategory: SubCategory, details?: ProductDetails): FormGroup {
    return new FormGroup({
      id: new FormControl(subCategory?.id ? subCategory.id : null),
      name: new FormControl(subCategory?.name ? subCategory.name : '', Validators.required),
      status: new FormControl(subCategory?.status ? subCategory.status : false),
      gender: new FormControl(subCategory?.gender ? subCategory.gender : false),
      categories: this.formBuilder.array(subCategory?.categories ? subCategory.categories : [])
    });
  }


}
