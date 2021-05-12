import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Categorie} from '../../shared/models/categorie.model';
import {TypeCategorie, TypeCategorieList} from '../../shared/enums/type-categorie';

@Component({
  selector: 'app-categories-new',
  templateUrl: './categories-new.component.html',
  styleUrls: ['./categories-new.component.scss']
})
export class CategoriesNewComponent implements OnInit {
  public formCategorie: FormGroup = new FormGroup({});
  public formCategorieList: FormGroup = new FormGroup({});
  public categorie!: Categorie;
  public typeCategorieList = TypeCategorieList;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createFormCategorieList();
  }

  ngOnInit(): void {
    this.createForm();
  }

  removeProduct(id: any): void {
    console.log('remove', id);
  }

  private createForm(): void {
    this.formCategorie = this.formBuilder.group({
      id: new FormControl(this.categorie?.id ? this.categorie.id : null),
      name: new FormControl(this.categorie?.name ? this.categorie.name : '', Validators.required),
      type: this.formBuilder.array([])
    });
  }

  private createFormCategorieList(): void {
    this.formCategorieList = this.formBuilder.group({
      typelist: this.formBuilder.array([])
    });
    this.initTypeList();
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
    this.type.controls = [];
    this.typeList.controls.forEach(t => {
      if (t.value.checked) {
        this.type.push(t.value.type);
      }
    });
  }
}
