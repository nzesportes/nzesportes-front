import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokenStorageService} from '../services/token-storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthVerifyLogin implements CanActivate {
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
  }

  canActivate(): Observable<boolean> | boolean {
    if (!this.tokenStorageService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
