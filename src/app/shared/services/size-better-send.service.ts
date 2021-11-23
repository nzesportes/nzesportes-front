import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SizeBetterSendPage} from '../models/pagination-model/size-better-send-page.model';
import {SizeBetterSend} from '../models/size-better-send.model';


@Injectable({
  providedIn: 'root'
})
export class SizeBetterSendService {

  api: string = environment.NZESPORTES_API + 'better-send/sizes/';

  constructor(
    private http: HttpClient
  ) {
  }

  create(sizeBetterSend: SizeBetterSend): Observable<SizeBetterSend> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.post<SizeBetterSend>(this.api, sizeBetterSend, {params});
  }

  getAll(size: number, page: number, type?: string): Observable<SizeBetterSendPage> {
    const params = new HttpParams()
      .set('async', 'true')
      .set('page', page.toString())
      .set('size', size.toString())
      .set('type', type ? type : '');
    return this.http.get<SizeBetterSendPage>(this.api, {params});
  }

  getById(id: string): Observable<SizeBetterSend> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.get<SizeBetterSend>(this.api + id, {params});
  }
  update(sizeBetterSend: SizeBetterSend): Observable<SizeBetterSend> {
    const params = new HttpParams()
      .set('async', 'true');
    return this.http.put<SizeBetterSend>(this.api, sizeBetterSend, {params});
  }
}
