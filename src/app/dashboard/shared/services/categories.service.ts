import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Categorie} from '../models/categorie.model';
import {Observable} from 'rxjs';
import {BrandPage} from '../models/pagination-model/brand-page.model';
import {CategoriePage} from '../models/pagination-model/categorie-page.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  api: string = environment.NZESPORTES_API + 'products/categories';

  constructor(
    private http: HttpClient
  ) {
  }

  create(categorie: Categorie): Observable<Categorie> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.post<Categorie>(this.api, categorie, {params});
  }
  getAll(size: number, page: number): Observable<CategoriePage> {
    const params = new HttpParams()
      .set('async', 'true')
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<CategoriePage>(this.api, {params});
  }
}
