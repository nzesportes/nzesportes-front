import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokenStorageService} from '../services/token-storage.service';
import {Observable} from 'rxjs';
import {Role} from '../enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthDashGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
  }

  canActivate(): Observable<boolean> | boolean {
    const isAdmin = this.tokenStorageService.getSessionUser().roles.find(r => r === Role.ROLE_ADMIN || r === Role.ROLE_MODERATOR);
    if (isAdmin) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
