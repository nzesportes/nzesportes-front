import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Address} from '../models/address.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  apiURL: string = environment.NZESPORTES_API + 'addresses';

  constructor(
    private http: HttpClient
  ) { }

  save(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiURL}`, address);
  }

  getByUser(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiURL}`);
  }

  getById(uuid: string): Observable<Address> {
    return this.http.get<Address>(`${this.apiURL}/${uuid}`);
  }

  update(address: Address): Observable<Address>  {
    return this.http.put<Address>(`${this.apiURL}`, address);
  }

  deleteById(uuid: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${uuid}`);
  }
}
