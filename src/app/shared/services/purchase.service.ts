import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaymentPurchaseTO} from '../models/payment-purchase-to.model';
import {PaymentTO} from '../models/payment-to.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  api: string = environment.NZESPORTES_API + 'purchase';

  constructor(
    private httpClient: HttpClient
  ) { }

  createPaymentRequest(paymentTO: PaymentTO): Observable<PaymentPurchaseTO> {
    return this.httpClient.post<PaymentPurchaseTO>(`${this.api}`, paymentTO);
  }
}
