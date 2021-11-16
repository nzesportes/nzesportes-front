import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Coupon} from '../models/coupon.model';
import {Observable} from 'rxjs';
import {CouponPage} from '../models/pagination-model/coupon-page.model';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  api: string = environment.NZESPORTES_API + 'coupons/';

  constructor(
    private http: HttpClient
  ) { }

  create(coupon: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(this.api, coupon);
  }

  update(coupon: Coupon): Observable<Coupon> {
    return this.http.put<Coupon>(this.api, coupon);
  }

  getAll(size: number, page: number, code?: string): Observable<CouponPage> {
    const urlCode = code ? '&code=' + code : '';
    return this.http.get<CouponPage>(this.api + '?async=true&page=' + page.toString() + '&size=' + size.toString()
      + urlCode );
  }

  getById(id: string): Observable<Coupon> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.get<Coupon>(this.api + id, {params});
  }

  validate(code: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.api}validate/${code}`);
  }
}
