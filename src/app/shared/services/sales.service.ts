import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SalePage} from '../models/pagination-model/sale-page.model';
import {Sale} from '../models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  api: string = environment.NZESPORTES_API + 'products/details/sales/';

  constructor(
    private http: HttpClient
  ) { }

  create(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.api, sale);
  }

  update(sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(this.api, sale);
  }

  getAll(size: number, page: number, code?: string): Observable<SalePage> {
    const urlCode = code ? '&status=' + code : '';
    return this.http.get<SalePage>(this.api + '?async=true&page=' + page.toString() + '&size=' + size.toString()
      + urlCode );
  }

  getById(id: string): Observable<Sale> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.get<Sale>(this.api + id, {params});
  }
}
