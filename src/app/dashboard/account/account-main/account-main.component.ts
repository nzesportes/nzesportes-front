import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {AuthenticationResponse} from '../../../shared/models/authentication-response.model';
import {mapRolesTranslate} from '../../../shared/enums/role.enum';

@Component({
  selector: 'app-account-main',
  templateUrl: './account-main.component.html',
  styleUrls: ['./account-main.component.scss']
})
export class AccountMainComponent implements OnInit {
  authResponse!: AuthenticationResponse;
  mapRolesTranslate = mapRolesTranslate;
  constructor(
    private tokenStorageService: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.authResponse = this.tokenStorageService.getSessionUser();

  }

  getPermissions(): string {
      return this.authResponse.roles.map((x) => x).join(', ');
  }
}
