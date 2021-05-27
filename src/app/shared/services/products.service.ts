import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';
import {ProductPage} from '../models/pagination-model/product-page.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  api: string = environment.NZESPORTES_API + 'products/';

  constructor(
    private http: HttpClient
  ) {
  }

  create(product: Product): Observable<Product> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.post<Product>(this.api, product, {params});
  }

  update(product: Product): Observable<Product> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.put<Product>(this.api, product, {params});
  }
  getAll(size: number, page: number): Observable<ProductPage> {
    const params = new HttpParams()
      .set('async', 'true')
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<ProductPage>(this.api, {params});
  }
  getById(id: string): Observable<Product> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.get<Product>(this.api + id, {params});
  }

  delete(id: string): Observable<Product> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.get<Product>(this.api + id, {params});
  }
}
