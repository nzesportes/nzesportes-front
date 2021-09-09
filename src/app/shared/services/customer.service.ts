import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Customer} from '../models/customer.model';
import {Observable} from 'rxjs';
import {CustomerPage} from '../models/pagination-model/customer-page.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiURL: string = environment.NZESPORTES_API + 'customers';


  constructor(
    private http: HttpClient
  ) { }

  create(customer: Customer): Observable<Customer> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.post<Customer>(`${this.apiURL}`, customer, {params});
  }

  getById(uuid: string): Observable<Customer> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.get<Customer>(`${this.apiURL}/${uuid}`, {params});
  }

  getByUserId(uuid: string): Observable<Customer> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.get<Customer>(`${this.apiURL}/users/${uuid}`, {params});
  }

  // TODO PAGEABLE

  update(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiURL}`, customer);
  }

  search(size: number, page: number, search?: string): Observable<CustomerPage>{
    const params = new HttpParams()
      .set('async', 'true')
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ? search : '');
    return this.http.get<CustomerPage>(`${this.apiURL}`, {params});
  }
}
