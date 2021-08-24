import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../shared/models/category.model';
import {TypeCategorie, TypeCategorieList} from '../../../shared/enums/type-categorie';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../../shared/services/categories.service';
import {map, take} from 'rxjs/operators';
import {ErrorWarning} from '../../../shared/models/error-warning.model';
import {PaginationService} from '../../../shared/services/pagination.service';

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
    private route: ActivatedRoute,
    public paginationService: PaginationService
  ) {
  }

  ngOnInit(): void {
    this.hasError = false;
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

  private createForm(): void {
    this.formCategorie = this.formBuilder.group({
      id: new FormControl(this.categorie?.id ? this.categorie.id : null),
      name: new FormControl(this.categorie?.name ? this.categorie.name : '', Validators.required),
      status: new FormControl(this.categorie?.status ? this.categorie.status : false),
    });
  }

  get validateFields(): any {
    return this.formCategorie.controls;
  }

  redirect(): void {
    this.router.navigateByUrl('/painel/categorias');
  }

  save(): void {
    const category = this.formCategorie.value;
    category.name = category.name.toLowerCase();
    const request = this.categorie ?
      this.categorieService.update(category) :
      this.categorieService.create(category);
    request
      .pipe(take(1))
      .subscribe(() => {
        this.dialogSuccess.title = 'Categoria salva com sucesso!';
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
    this.categorieService.delete(this.categorie?.id)
      .pipe(take(1))
      .subscribe(() => {
        this.dialogSuccess.title = 'Categoria excluída com sucesso!';
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
}
