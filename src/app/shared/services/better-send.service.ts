import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {BetterSendTokenStatus} from '../models/BetterSendTokenStatus.model';

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
}
