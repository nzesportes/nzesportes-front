import {AfterContentInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SubCategoriesService} from '../../../shared/services/sub-categories.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SubCategory} from '../../../shared/models/sub-category.model';
import {take} from 'rxjs/operators';
import {PaginationService} from '../../../shared/services/pagination.service';
import {SubCategoryPage} from '../../../shared/models/pagination-model/sub-category-page.model';
import {Gender, mapGender} from '../../../shared/enums/gender';

@Component({
  selector: 'app-sub-categories-list',
  templateUrl: './sub-categories-list.component.html',
  styleUrls: ['./sub-categories-list.component.scss']
})
export class SubCategoriesListComponent implements OnInit, AfterContentInit {

  categories: SubCategory[] = [];
  page = 0;
  content: SubCategoryPage | undefined;
  hasError!: boolean;

  mapGender = mapGender;

  public formFilter: FormGroup = new FormGroup({});
  constructor(
    private subCategoriesService: SubCategoriesService,
    private cdr: ChangeDetectorRef,
    public paginationService: PaginationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.hasError = false;
    this.createForm();
  }


  private createForm(): void {
    this.formFilter = this.formBuilder.group({
      name: new FormControl(),
      status: new FormControl(),
      gender: new FormControl(),
      type: new FormControl(),
    });
  }

  ngAfterContentInit(): void {
    this.paginationService.initPagination();
    this.getAllSubCategories(10, this.page);
    this.cdr.detectChanges();
  }


  getAllSubCategories(size: number, page: number, status?: string, name?: string, gender?: Gender): void {
    this.subCategoriesService.getAll(size, page, status, name, gender)
      .pipe(take(1))
      .subscribe(r => {
        this.categories = r.content;
        this.content = r;
        this.paginationService.getPageRange(this.content.totalElements);
      }, () => {
        this.hasError = true;
      });
  }


  updateIndex(index: number): void {
    this.getAllSubCategories(10, index);
    this.paginationService.page = index;
  }

  onChangeFilter(): void {
    this.page = 0;
    const status = this.formFilter.get('status')?.value;
    const name = this.formFilter.get('name')?.value;
    const gender = this.formFilter.get('gender')?.value as Gender;
    this.getAllSubCategories(10, 0, status, name, gender);
  }

}
