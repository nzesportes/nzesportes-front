import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../../shared/services/token-storage.service';
import {CustomerService} from '../../../../shared/services/customer.service';
import {Customer} from '../../../../shared/models/customer.model';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {

  // @ts-ignore
  customer: Customer;

  constructor(
    private tokenStorageService: TokenStorageService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.customerService.getByUserId(this.tokenStorageService.getSessionUser().id)
      .subscribe(response => {
        this.customer = response;
      });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
