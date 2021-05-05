import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Customer} from '../models/customer.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiURL: string = environment.NZESPORTES_API + 'customers';


  constructor(
    private http: HttpClient
  ) { }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiURL}`, customer);
  }

  getById(uuid: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiURL}/${uuid}`);
  }

  getByUserId(uuid: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiURL}/users/${uuid}`);
  }

  // TODO PAGEABLE

  update(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiURL}`, customer);
  }
}
