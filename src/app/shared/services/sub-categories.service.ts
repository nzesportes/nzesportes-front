import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SubCategory} from '../models/sub-category.model';
import {SubCategoryPage} from '../models/pagination-model/sub-category-page.model';
import {Gender} from '../enums/gender';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {
  api: string = environment.NZESPORTES_API + 'products/sub-categories/';

  constructor(
    private http: HttpClient
  ) { }

  create(subCategory: SubCategory): Observable<SubCategory> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.post<SubCategory>(this.api, subCategory, {params});
  }

  getAll(size: number, page: number, status?: string, name?: string, gender?: Gender): Observable<SubCategoryPage> {
    const params = new HttpParams()
      .set('async', 'true')
      .set('page', page.toString())
      .set('size', size.toString())
      .set('status', status === 'true' ? 'true' : status === 'false' ? 'false' : '')
      .set('name', name ? name : '')
      .set('gender', gender ? gender : '');

    return this.http.get<SubCategoryPage>(this.api, {params});
  }

  update(subCategory: SubCategory): Observable<SubCategory> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.put<SubCategory>(this.api, subCategory, {params});
  }

  getById(id: string): Observable<SubCategory> {
    const params = new HttpParams().set('async', 'true');
    return this.http.get<SubCategory>(this.api + id, {params});
  }

  delete(id: string): Observable<void> {
    const params = new HttpParams().set('async', 'true');
    return this.http.delete<void>(this.api + id, {params});
  }
}
