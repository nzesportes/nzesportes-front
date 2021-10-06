import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Contact} from '../models/contact.model';
import {ContactPage} from '../models/pagination-model/contact-page.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiURL: string = environment.NZESPORTES_API + 'contact';

  constructor(
    private http: HttpClient
  ) {
  }

  save(contact: Contact): Observable<any> {
    return this.http.post<any>(`${this.apiURL}`, contact);
  }

  getById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiURL}/${id}`);
  }

  getAll(size: number, page: number, read?: boolean): Observable<ContactPage> {
    const urlRead = read !== undefined ? '&read=' + read : '';
    return this.http.get<ContactPage>(this.apiURL + '?async=true&page=' + page.toString() + '&size=' + size.toString()
      + urlRead);
  }

  updateRead(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${id}/read`, id);
  }
}
