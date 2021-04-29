import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {AutheticationRequest} from '../models/authetication-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.NZESPORTES_API + 'api/auth';

  constructor(
    private http: HttpClient
  ) { }

  registerUser(autheticationRequest: AutheticationRequest): Observable<User> {
    return this.http.post<User>(`${this.apiURL}/sign-up`, autheticationRequest);
  }

}
