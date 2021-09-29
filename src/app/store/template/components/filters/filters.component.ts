import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../../../shared/services/products.service';
import {Gender} from '../../../../shared/enums/gender';
import {Order} from '../../../../shared/enums/order.enum';
import {FiltersService} from '../../../services/filters.service';
import {BrandsService} from '../../../../shared/services/brands.service';
import {take} from 'rxjs/operators';
import {Brand} from '../../../../shared/models/brand.model';
import {BrandPage} from '../../../../shared/models/pagination-model/brand-page.model';
import {PaginationService} from '../../../../shared/services/pagination.service';
import {Category} from '../../../../shared/models/category.model';
import {CategoriesService} from '../../../../shared/services/categories.service';
import {Subscription} from 'rxjs';
import {DetailsFiltersRequest} from '../../../models/details-filters-request';
import {SubCategoriesService} from '../../../../shared/services/sub-categories.service';
import {SubCategory} from '../../../../shared/models/sub-category.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {

  formFilters!: FormGroup;
  verifyFilters = false;
  brands: Brand[] = [];
  categories: Category[] = [];
  subCategories: SubCategory[] = [];

  sizes: string[] = [];
  content!: BrandPage;
  hasError = false;

  colors = [
    {
      color: '#000000',
      border: '#000000',
      name: 'preto'
    },
    {
      color: '#ffffff',
      border: '#000000',
      name: 'branco'
    },
    {
      color: '#808080',
      border: '#808080',
      name: 'cinza'
    },
    {
      color: '#0000cc',
      border: '#0000cc',
      name: 'azul'
    },
    {
      color: '#ff0000',
      border: '#ff0000',
      name: 'vermelho'
    },
    {
      color: '#33cc00',
      border: '#33cc00',
      name: 'verde'
    },
    {
      color: '#fff200',
      border: '#fff200',
      name: 'amarelo'
    },
    {
      color: '#ff9900',
      border: '#ff9900',
      name: 'laranja'
    },
    {
      color: '#ff66cc',
      border: '#ff66cc',
      name: 'rosa'
    },
    {
      color: '#deb887',
      border: '#deb887',
      name: 'bege'
    },
    {
      color: '#996600',
      border: '#996600',
      name: 'marrom'
    },
    {
      color: '#9933cc',
      border: '#9933cc',
      name: 'roxo'
    },
    {
      color: '#a30000',
      border: '#a30000',
      name: 'borgonha'
    },
    {
      color: '#00ffcc',
      border: '#00ffcc',
      name: 'turquesa'
    }
  ];

  subscription!: Subscription;
  nameInit!: string;
  genderInit!: string;
  categoryInit!: string;
  subCategoryInit!: string;

  sizeInit!: string;
  colorInit!: string;
  brandInit!: string;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private filterService: FiltersService,
    private brandsService: BrandsService,
    private paginationService: PaginationService,
    private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoriesService

) {
  }

  ngOnInit(): void {
    this.createForm();
    this._resetValuesForm();
    this.verifyFilters = this._verifyFilters();
    this._setValuesInit();

    this.subscription = this.productsService.detailsFiltersState$.subscribe(filter => {
      this._initializeVariables(filter);
      this._setValuesInit();
      this.hasError = false;
    }, error => {
      console.log(error);
      this.hasError = true;
    });

    this.verifyFilters = this._verifyFilters();
    this.getBrands();
    this.getCategories();
    this.getSubCategories();
    this.createSize();
  }

  ngOnDestroy(): void {
    this.filterService.setFilter(this.formFilters.value);
  }

  createForm(): void {
    this.formFilters = this.formBuilder.group({
      gender: [this.filterService.filter?.gender ? this.filterService.filter.gender : ''],
      category: [this.filterService.filter?.category ? this.filterService.filter.category : ''],
      subCategory: [this.filterService.filter?.subCategory ? this.filterService.filter.subCategory : ''],
      size: [this.filterService.filter?.size ? this.filterService.filter.size : ''],
      color: [this.filterService.filter?.color ? this.filterService.filter.color : ''],
      brand: [this.filterService.filter?.brand ? this.filterService.filter.brand : ''],
      classBy: [this.filterService.filter?.classBy ? this.filterService.filter.classBy : '']
    });
  }

  createSize(): void {
    this.sizes.push('P');
    this.sizes.push('M');
    this.sizes.push('G');
    this.sizes.push('GG');
    this.sizes.push('XGG');
    for (let i = 18; i <= 50; i++) {
      this.sizes.push(i.toString());
    }
  }

  sendDetailsFilters(): void {
    this.productsService.setDetailsFiltersState(
      this.filterService.filter.name,
      this.formFilters?.get('gender')?.value as Gender,
      this.formFilters?.get('category')?.value,
      this.formFilters?.get('size')?.value,
      this.formFilters?.get('color')?.value,
      this.formFilters?.get('brand')?.value,
      this.formFilters?.get('classBy')?.value as Order,
      this.formFilters?.get('subCategory')?.value,
    );
  }

  selectFilter(): void {
    this.sendDetailsFilters();
    this.verifyFilters = this._verifyFilters();
  }

  changeStateItemMenu(itemMenu: HTMLElement): void {
    if (itemMenu.className === 'scroll submenu') {
      itemMenu.className = 'scroll submenu menu-opened';
    } else if (itemMenu.className === 'scroll submenu menu-opened') {
      itemMenu.className = 'scroll submenu';
    }
  }

  changeStateOrderBy(itemMenu: HTMLElement): void {
    if (itemMenu.className === 'submenu order-by') {
      itemMenu.className = 'submenu menu-opened order-by';
    } else if (itemMenu.className === 'submenu menu-opened order-by') {
      itemMenu.className = 'submenu order-by';
    }
  }

  private _verifyFilters(): boolean {
    if (this.formFilters.get('gender')?.value === '' && this.formFilters.get('category')?.value === ''
      && this.formFilters.get('size')?.value === '' && this.formFilters.get('color')?.value === ''
      && this.formFilters.get('brand')?.value === '' && this.formFilters.get('subCategory')?.value === '') {
      return false;
    }
    return true;
  }

  removeFilter(filter: string): void {
    this.formFilters.get(filter)?.setValue('');
    this.sendDetailsFilters();
    this.verifyFilters = this._verifyFilters();
  }

  removeAll(): void {
    this._resetValuesForm();
    this._setValuesInit();
    this.sendDetailsFilters();
    this.verifyFilters = this._verifyFilters();
  }

  getBrands(): void {
    this.brandsService.getAll(200, 0)
      .pipe(take(1))
      .subscribe(response => {
        this.brands = response.content;
        /*this.content = response;
        this.paginationService.getPageRange(this.content.totalElements);*/
        this.hasError = false;
      }, error => {
        this.hasError = true;
        console.log(error);
      });
  }

  getCategories(): void {
    this.categoriesService.getAll(200, 0)
      .pipe(take(1))
      .subscribe(response => {
        this.categories = response.content;
        this.hasError = false;
      }, error => {
        this.hasError = true;
        console.log(error);
      });
  }
  getSubCategories(): void {
    this.subCategoriesService.getAll(200, 0)
      .pipe(take(1))
      .subscribe(response => {
        this.subCategories = response.content;
        this.hasError = false;
      }, error => {
        this.hasError = true;
        console.log(error);
      });
  }

  private _setValuesInit(): void {
    this.genderInit = this.formFilters.get('gender')?.value;
    this.categoryInit = this.formFilters.get('category')?.value;
    this.subCategoryInit = this.formFilters.get('subCategory')?.value;
    this.sizeInit = this.formFilters.get('size')?.value;
    this.colorInit = this.formFilters.get('color')?.value;
    this.brandInit = this.formFilters.get('brand')?.value;
  }

  private _initializeVariables(filter: DetailsFiltersRequest): void{
    this.nameInit = filter.name;
    if (this.nameInit) {
      this._setValuesInit();
      this._resetValuesForm();
      this.verifyFilters = this._verifyFilters();
    } else {
      this.formFilters?.get('category')?.setValue(
        filter.category ? filter.category : this.formFilters?.get('category')?.value
      );
      this.formFilters?.get('size')?.setValue(
        filter.size ? filter.size : this.formFilters?.get('size')?.value
      );
      this.formFilters?.get('color')?.setValue(
        filter.color ? filter.color : this.formFilters?.get('color')?.value
      );
      this.formFilters?.get('brand')?.setValue(
        filter.brand ? filter.brand : this.formFilters?.get('brand')?.value
      );
      this.formFilters?.get('gender')?.setValue(
        filter.gender ? filter.gender : this.formFilters?.get('gender')?.value
      );
      this.formFilters?.get('subCategory')?.setValue(
        filter.subCategory ? filter.subCategory : this.formFilters?.get('subCategory')?.value
      );
    }
  }

  private _resetValuesForm(): void {
    this.formFilters.get('gender')?.setValue('');
    this.formFilters.get('category')?.setValue('');
    this.formFilters.get('size')?.setValue('');
    this.formFilters.get('color')?.setValue('');
    this.formFilters.get('brand')?.setValue('');
    this.formFilters.get('subCategory')?.setValue('');
  }
}
