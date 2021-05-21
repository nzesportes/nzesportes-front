import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../shared/models/category.model';
import {TypeCategorie, TypeCategorieList} from '../../../shared/enums/type-categorie';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../../shared/services/categories.service';
import {map, take} from 'rxjs/operators';
import {ErrorWarning} from '../../../shared/models/error-warning.model';

@Component({
  selector: 'app-categories-new',
  templateUrl: './categories-new.component.html',
  styleUrls: ['./categories-new.component.scss']
})
export class CategoriesNewComponent implements OnInit {
  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  public formCategorie: FormGroup = new FormGroup({});
  public formCategorieList: FormGroup = new FormGroup({});
  public categorie!: Category;
  public typeCategorieList = TypeCategorieList;
  hasError!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categorieService: CategoriesService,
    private route: ActivatedRoute
  ) {
    this.createFormCategorieList();
  }

  ngOnInit(): void {
    this.createForm();
    if (this.router.url.includes('categorias/categoria')) {
      this.route.params.pipe(
        map(p => p.id)
      ).subscribe(id => {
        this.categorieService.getById(id)
          .pipe(take(1))
          .subscribe(c => {
            this.categorie = c;
            this.createForm();
          }, () => {
            this.hasError = true;
          });
      });
    }
  }

  removeTypeCategorie(i: number): void {
    this.type.removeAt(i);
  }

  removeProduct(id: any): void {
    console.log('remove', id);
  }

  private createForm(): void {
    this.formCategorie = this.formBuilder.group({
      id: new FormControl(this.categorie?.id ? this.categorie.id : null),
      name: new FormControl(this.categorie?.name ? this.categorie.name : '', Validators.required),
      status: new FormControl(this.categorie?.status ? this.categorie.status : false),
      type: this.formBuilder.array(this.categorie?.type ? this.categorie.type : [], Validators.required)
    });
  }

  private createFormCategorieList(): void {
    this.formCategorieList = this.formBuilder.group({
      typelist: this.formBuilder.array([])
    });
    this.initTypeList();
  }

  loadCategorieOnList(): void {
    this.typeList.clear();
    this.typeCategorieList.forEach(t => {
      const hasType = this.type.controls.find(t1 => t1.value === t);
      this.typeList.push(this.createTypeListForm(hasType ? true : false, t));
    });
  }

  initTypeList(): void {
    this.typeCategorieList.forEach(t => {
      this.typeList.push(this.createTypeListForm(false, t));
    });
  }

  get typeList(): FormArray {
    return this.formCategorieList.get('typelist') as FormArray;
  }

  private createTypeListForm(checked: boolean, typeCategorie: TypeCategorie): FormGroup {
    return new FormGroup({
        checked: new FormControl(checked),
        type: new FormControl(typeCategorie, Validators.required),
      }
    );
  }

  get type(): FormArray {
    return this.formCategorie.get('type') as FormArray;
  }

  addTypeListCategorie(): void {
    this.type.clear();
    this.typeList.controls.forEach(t => {
      if (t.value.checked) {
        this.type.push(this.formBuilder.control(t.value.type));
      }
    });
  }

  get validateFields(): any {
    return this.formCategorie.controls;
  }

  redirect(): void {
    this.router.navigateByUrl('/painel/categorias');
  }

  save(): void {
    if (this.categorie?.id) {
      this.categorieService.update(this.formCategorie.value)
        .pipe(take(1))
        .subscribe(() => {
          this.dialogSuccess.title = 'Categoria atualizada com sucesso!';
          this.dialogSuccess.fire();
        }, error => {
          this.setErrorDialog(error);
          this.dialogError.fire();
        });
    } else {
      this.categorieService.create(this.formCategorie.value)
        .pipe(take(1))
        .subscribe(() => {
          this.dialogSuccess.title = 'Categoria criada com sucesso!';
          this.dialogSuccess.fire();
        }, error => {
          this.setErrorDialog(error);
          this.dialogError.fire();
        });
    }

  }


  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }
}
