import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductSize} from '../models/product-size.model';

@Injectable({
  providedIn: 'root'
})
export class ProductSizeService {

  api: string = environment.NZESPORTES_API + 'products-size/';

  constructor(
    private http: HttpClient
  ) {
  }

  create(productSize: ProductSize): Observable<ProductSize> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.post<ProductSize>(this.api, productSize, {params});
  }

  getAll(size: number, page: number, name?: string): Observable<ProductSize[]> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.get<ProductSize[]>(this.api, {params});
  }

  getById(id: string): Observable<ProductSize> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.get<ProductSize>(this.api + id, {params});
  }
  update(productSize: ProductSize): Observable<ProductSize> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.put<ProductSize>(this.api, productSize, {params});
  }
}
