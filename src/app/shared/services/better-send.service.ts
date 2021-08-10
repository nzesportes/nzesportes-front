import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {BetterSendTokenStatus} from '../models/BetterSendTokenStatus.model';
import {Shipping} from '../models/shipping.model';
import {ShippingResult} from '../models/shipping-result.model';

@Injectable({
  providedIn: 'root'
})
export class BetterSendService {
  apiURL: string = environment.NZESPORTES_API + 'better-send/';

  constructor(
    private http: HttpClient
  ) { }

  postToken(code: string): Observable<any>{
    const head = new HttpHeaders()
      .append('code', code);
    return this.http.post<any>(this.apiURL + `?async=true`, {}, {headers: head});
  }

  getStatusBetterSend(): Observable<BetterSendTokenStatus>{
    return this.http.get<BetterSendTokenStatus>(this.apiURL + `validation?async=true`);
  }

  calculateShipping(body: Shipping): Observable<ShippingResult>{
    return this.http.post<ShippingResult>(this.apiURL + `calculate?async=true`, body);
  }
}
