import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokenStorageService} from '../services/token-storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }

  canActivate(): Observable<boolean> | boolean  {
    if (this.tokenStorageService.isLoggedIn()) {
      // this.tokenStorageService.refreshToken();
      return true;
    } else {
      this.tokenStorageService.signOut();
      this.router.navigateByUrl('');
      return false;
    }
  }
}
