import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Category} from '../models/category.model';
import {Observable} from 'rxjs';
import {CategoryPage} from '../models/pagination-model/category-page.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  api: string = environment.NZESPORTES_API + 'products/categories/';

  constructor(
    private http: HttpClient
  ) {
  }

  create(categorie: Category): Observable<Category> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.post<Category>(this.api, categorie, {params});
  }

  getAll(size: number, page: number): Observable<CategoryPage> {
    const params = new HttpParams()
      .set('async', 'true')
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<CategoryPage>(this.api, {params});
  }

  update(categorie: Category): Observable<Category> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.put<Category>(this.api + categorie.id, categorie, {params});
  }

  getById(id: string): Observable<Category> {
    const params = new HttpParams().set('async', 'true');
    return this.http.get<Category>(this.api + id, {params});
  }

  delete(id: string): Observable<void> {
    const params = new HttpParams().set('async', 'true');
    return this.http.delete<void>(this.api + id, {params});
  }
}
