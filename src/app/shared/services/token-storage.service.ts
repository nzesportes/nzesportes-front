import {Injectable} from '@angular/core';
import {AuthenticationResponse} from '../models/authentication-response.model';

import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import {shareReplay, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {AuthenticationRequest} from '../models/authentication-request.model';
import * as CryptoJS from 'crypto-js';
import {environment} from '../../../environments/environment';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const EXPIRES_AT = 'expires_at';
const TOKEN_HASH_KEY = environment.TOKEN_HASH_KEY;
const USER_HASH_KEY = environment.USER_HASH_KEY;



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

    const tokenHash = CryptoJS.AES.encrypt(token, TOKEN_HASH_KEY).toString();
    const expiraAtRash = CryptoJS.AES.encrypt(JSON.stringify(expiresAt.valueOf()), TOKEN_HASH_KEY).toString();

    window.localStorage.setItem(TOKEN_KEY, tokenHash);
    window.localStorage.setItem(EXPIRES_AT, expiraAtRash);
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

  authenticateUserSession(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.authService.authenticateUser(authenticationRequest)
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
      const expiresAt = JSON.parse(CryptoJS.AES.decrypt(expiration, TOKEN_HASH_KEY).toString(CryptoJS.enc.Utf8));
      return moment(expiresAt);
    }
  }

  isLoggedIn(): any {
    return moment().isBefore(this.getExpiration());
  }

  public getToken(): string | null {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
      return CryptoJS.AES.decrypt(token, TOKEN_HASH_KEY).toString(CryptoJS.enc.Utf8);
    }
    return null;
  }

  public setSessionUser(user: AuthenticationResponse): void {
    window.localStorage.removeItem(USER_KEY);
    const userHash = CryptoJS.AES.encrypt(JSON.stringify(user), USER_HASH_KEY).toString();
    window.localStorage.setItem(USER_KEY, userHash);
  }

  public getSessionUser(): AuthenticationResponse {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(CryptoJS.AES.decrypt(user, USER_HASH_KEY).toString(CryptoJS.enc.Utf8));
    }
    return {id: '', roles: [], token: '', username: ''};
  }
}

interface JWTPayload {
  exp: number;
}
