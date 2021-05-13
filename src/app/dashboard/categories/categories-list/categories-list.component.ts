import {AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TypeCategorieList} from '../../shared/enums/type-categorie';
import {Categorie} from '../../shared/models/categorie.model';
import {CategoriePage} from '../../shared/models/pagination-model/categorie-page.model';
import {CategoriesService} from '../../shared/services/categories.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, AfterContentInit  {
  public typeCategorieList = TypeCategorieList;

  categories: Categorie[] = [];
  page = 0;
  content: CategoriePage | undefined;
  pages: number | undefined;
  public pageRange: any;
  hasError!: boolean;

  constructor(
    private categorieService: CategoriesService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.getAllCategories(10, this.page);
    this.cdr.detectChanges();
  }


  getAllCategories(size: number, page: number): void {
    this.categorieService.getAll(size, page)
      .pipe(take(1))
      .subscribe(r => {
        this.categories = r.content;
        this.content = r;
        this.getPageRange();
      }, () => {
        this.hasError = true;
      });
  }

  getPageRange(): void {
    // @ts-ignore
    this.pages = Math.ceil(this.content?.totalElements / 10);

    this.pageRange = {
      first: this.page > 2 ? this.page - 3 : 0,
      last: this.page > 2 && this.pages > this.page + 3 ? this.page + 3 :
        this.page < 3 && this.pages >= 5 ? 5 :
          this.page === this.pages || this.pages < 5 ?
            this.pages : this.page + (this.pages - this.page)
    };
  }

  getRange(): any[] {
    const result = [];
    for (let i = this.pageRange.first; i < this.pageRange.last; i++) {
      result.push(i);
    }
    return result;
  }


  updateIndex(index: number): void {
    this.getAllCategories(10, index);
    this.page = index;
  }

}
