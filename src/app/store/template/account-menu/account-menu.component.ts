import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../shared/services/token-storage.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {

  constructor(
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
