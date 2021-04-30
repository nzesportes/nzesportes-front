import {Injectable} from '@angular/core';
import {AuthenticationResponse} from '../models/authentication-response.model';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const EXPIRES_AT = 'expires_at';


import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import {map, shareReplay, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {AuthenticationRequest} from '../models/authentication-request.model';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(
    private authService: AuthService
  ) {
  }

  signOut(): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(EXPIRES_AT);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);

    const payload = jwt_decode(token) as JWTPayload;
    const expiresAt = moment.unix(payload.exp);

    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(EXPIRES_AT, JSON.stringify(expiresAt.valueOf()));
  }

  setSession(authenticationResponse: AuthenticationResponse): void {
    this.setSessionUser(authenticationResponse);
    this.saveToken(authenticationResponse.token);
  }

  registerUserSession(autheticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.authService.registerUser(autheticationRequest)
      .pipe(
        tap(response => {
          this.setSession(response);
          return response;
        })
      );
  }

  refreshToken(): any {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.authService.refreshToken()
        .pipe(
          tap(response => this.setSession(response)),
          shareReplay(),
        ).subscribe();
    }
  }

  getExpiration(): any {
    const expiration = localStorage.getItem(EXPIRES_AT);
    if (expiration != null) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
  }

  isLoggedIn(): any {
    return moment().isBefore(this.getExpiration());
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public setSessionUser(user: AuthenticationResponse): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getSessionUser(): AuthenticationResponse {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {id: '', roles: [], token: '', username: ''};
  }
}
interface JWTPayload {
  exp: number;
}
