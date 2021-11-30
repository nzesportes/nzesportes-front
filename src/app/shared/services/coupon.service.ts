import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Coupon} from '../models/coupon.model';
import {Observable} from 'rxjs';
import {CouponPage} from '../models/pagination-model/coupon-page.model';
import {CouponTO} from '../models/coupon-to.model';
import {AuthenticationResponse} from '../models/authentication-response.model';
import * as CryptoJS from 'crypto-js';


const USER_HASH_KEY = environment.USER_HASH_KEY;
const COUPON_KEY = 'coupon';

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

  validate(code: string): Observable<CouponTO> {
    return this.http.get<CouponTO>(`${this.api}validate/${code}`);
  }

  // crypt cart
  setCouponSession(coupon: Coupon): void {
    window.sessionStorage.removeItem(COUPON_KEY);
    const userHash = CryptoJS.AES.encrypt(JSON.stringify(coupon), USER_HASH_KEY).toString();
    window.sessionStorage.setItem(COUPON_KEY, userHash);
  }
  getCouponSession(): Coupon | null {
    const coupon = window.sessionStorage.getItem(COUPON_KEY);
    if (coupon) {
      return JSON.parse(CryptoJS.AES.decrypt(coupon, USER_HASH_KEY).toString(CryptoJS.enc.Utf8));
    }
    return null;
  }
}
