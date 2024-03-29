import {Component, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SubCategory} from '../../../shared/models/sub-category.model';
import {map, take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginationService} from '../../../shared/services/pagination.service';
import {SubCategoriesService} from '../../../shared/services/sub-categories.service';
import {ErrorWarning} from '../../../shared/models/error-warning.model';
import {CategoriesService} from '../../../shared/services/categories.service';
import {Category} from '../../../shared/models/category.model';

@Component({
  selector: 'app-sub-categories-new',
  templateUrl: './sub-categories-new.component.html',
  styleUrls: ['./sub-categories-new.component.scss']
})
export class SubCategoriesNewComponent implements OnInit {


  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  public formSubCategory: FormGroup = new FormGroup({});
  public formCategoryList: FormGroup = new FormGroup({});
  public subCategory!: SubCategory;
  hasError!: boolean;

  public categories: Category[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private subCategoriesService: SubCategoriesService,
    private route: ActivatedRoute,
    public paginationService: PaginationService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.hasError = false;
    this.createForm();
    if (this.router.url.includes('sub-categorias/sub-categoria')) {
      this.route.params.pipe(
        map(p => p.id)
      ).subscribe(id => {
        this.subCategoriesService.getById(id)
          .pipe(take(1))
          .subscribe(c => {
            this.subCategory = c;
            this.createForm();
            this.getCategories();
          }, () => {
            this.hasError = true;
          });
      });
    }else{
      this.getCategories();
    }
  }
  private createForm(): void {
    this.formSubCategory = this.formBuilder.group({
      id: new FormControl(this.subCategory?.id ? this.subCategory.id : null),
      name: new FormControl(this.subCategory?.name ? this.subCategory.name : '', Validators.required),
      status: new FormControl(this.subCategory?.status ? this.subCategory.status : false),
      onMenu: new FormControl(this.subCategory?.onMenu ? this.subCategory.onMenu : false),
      gender: new FormControl(this.subCategory?.gender ? this.subCategory.gender : '', Validators.required),
      categoryId: new FormControl(this.subCategory?.category?.id ? this.subCategory.category.id : '', Validators.required),
    });
  }

  get validateFields(): any {
    return this.formSubCategory.controls;
  }

  redirect(): void {
    this.router.navigateByUrl('/painel/sub-categorias');
  }

  save(): void {
    const category = this.formSubCategory.value as SubCategory;
    category.name = category.name.toLowerCase();
    const request = this.subCategory ?
      this.subCategoriesService.update(category) :
      this.subCategoriesService.create(category);
    request
      .pipe(take(1))
      .subscribe(() => {
        this.dialogSuccess.title = 'Subcategoria salva com sucesso!';
        this.dialogSuccess.fire();
      }, error => {
        this.setErrorDialog(error);
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.save();
          }
        });
      });
  }


  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }

  delete(): void {
    this.subCategoriesService.delete(this.subCategory?.id)
      .pipe(take(1))
      .subscribe(() => {
        this.dialogSuccess.title = 'Subcategoria excluída com sucesso!';
        this.dialogSuccess.fire();
      }, error => {
        this.setErrorDialog(error);
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.delete();
          }
        });
      });
  }
  getCategories(): void {
    this.categoriesService.getAll(50, 0)
      .pipe(take(1))
      .subscribe(r => {
        this.categories = r.content;
      }, () => {
        this.hasError = true;
      });
  }


  setCategorie(): void {
    if (this.subCategory) {
      const updateCategory: SubCategory = {
        id: this.subCategory.id,
        name: this.formSubCategory.value.name.toLowerCase(),
        gender: this.formSubCategory.value.gender,
        status: this.formSubCategory.value.status,
        categoryId: this.formSubCategory.value.categoryId,
        onMenu: this.formSubCategory.value.onMenu
      };
      this.subCategoriesService.update(updateCategory)
        .pipe(
          take(1)
        )
        .subscribe((result) => {
          this.subCategory =  result;
        }, error => {
          this.setErrorDialog(error);
          this.errorCallSaveCategory();
        });
    }

  }
  errorCallSaveCategory(): void {
    this.dialogError.fire().then(r => {
      if (r.isConfirmed) {
        this.setCategorie();
      }
    });
  }

}
