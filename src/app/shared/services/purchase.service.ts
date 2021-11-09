import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaymentPurchaseTO} from '../models/payment-purchase-to.model';
import {PaymentTO} from '../models/payment-to.model';
import {Purchase} from '../models/purchase.model';
import {PurchasePage} from '../models/pagination-model/purchase-page.model';
import {Customer} from '../models/customer.model';
import {BrandPage} from '../models/pagination-model/brand-page.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  api: string = environment.NZESPORTES_API + 'purchase';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  createPaymentRequest(paymentTO: PaymentTO): Observable<PaymentPurchaseTO> {
    return this.httpClient.post<PaymentPurchaseTO>(`${this.api}`, paymentTO);
  }

  getAllByCustomerId(size: number, page: number, customerId: string): Observable<PurchasePage> {
    const params = new HttpParams()
      .set('async', 'true')
      .set('page', page.toString())
      .set('size', size.toString())
      .set('customerId', customerId ? customerId : '');
    return this.httpClient.get<PurchasePage>(`${this.api}/customers/${customerId}`, {params});
  }

  getAll(size: number, page: number): Observable<PurchasePage> {
    const params = new HttpParams()
      .set('async', 'true')
      .set('page', page.toString())
      .set('size', size.toString());
    return this.httpClient.get<PurchasePage>(`${this.api}`, {params});
  }

  getById(id: string): Observable<Purchase> {
    return this.httpClient.get<Purchase>(`${this.api}/${id}`);
  }
}
