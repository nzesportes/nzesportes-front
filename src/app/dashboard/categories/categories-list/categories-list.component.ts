import {AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TypeCategorie, TypeCategorieList} from '../../../shared/enums/type-categorie';
import {Category} from '../../../shared/models/category.model';
import {CategoryPage} from '../../../shared/models/pagination-model/category-page.model';
import {CategoriesService} from '../../../shared/services/categories.service';
import {take} from 'rxjs/operators';
import {PaginationService} from '../../../shared/services/pagination.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, AfterContentInit  {
  public typeCategorieList = TypeCategorieList;

  categories: Category[] = [];
  page = 0;
  content: CategoryPage | undefined;
  pages: number | undefined;
  public pageRange: any;
  hasError!: boolean;

  constructor(
    private categorieService: CategoriesService,
    private cdr: ChangeDetectorRef,
    public paginationService: PaginationService
  ) {
  }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.paginationService.initPagination();
    this.getAllCategories(10, this.page);
    this.cdr.detectChanges();
  }


  getAllCategories(size: number, page: number): void {
    this.categorieService.getAll(size, page)
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
    this.getAllCategories(10, index);
    this.paginationService.page = index;
  }
  TypeCategorieString(types: TypeCategorie[]): string {
    return types.map((x) => x).join(', ');
  }

}
