import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Brand} from '../models/brand.model';
import {Observable} from 'rxjs';
import {BrandPage} from '../models/pagination-model/brand-page.model';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  api: string = environment.NZESPORTES_API + 'products/brands/';

  constructor(
    private http: HttpClient
  ) {
  }

  create(brand: Brand): Observable<Brand> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.post<Brand>(this.api, brand, {params});
  }

  getAll(size: number, page: number): Observable<BrandPage> {
    const params = new HttpParams()
      .set('async', 'true')
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<BrandPage>(this.api, {params});
  }

  getById(id: string): Observable<Brand> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.get<Brand>(this.api + id, {params});
  }
  update(brand: Brand): Observable<Brand> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.put<Brand>(this.api, brand, {params});
  }
  delete(id: string): Observable<void> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.delete<void>(this.api + id,  {params});
  }
}
