import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthenticationRequest} from '../models/authentication-request.model';
import {AuthenticationResponse} from '../models/authentication-response.model';
import {ChangePasswordTO} from '../models/change-password-TO.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.NZESPORTES_API + 'api/auth';

  constructor(
    private http: HttpClient
  ) {
  }

  registerUser(autheticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiURL}/sign-up?async=true`, autheticationRequest);
  }

  refreshToken(): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiURL}/refresh-token?async=true`, null);
  }

  authenticateUser(autheticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiURL}?async=true`, autheticationRequest);
  }

  changePassword(dto: ChangePasswordTO): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/change-password`, dto);
  }

  createFlow(authenticationRequest: AuthenticationRequest, flow: string): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/${flow}?async=true`, authenticationRequest);
  }

  firstAccess(id: string, dto: ChangePasswordTO, flow: string): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${flow}/${id}?async=true`, dto);
  }
}
