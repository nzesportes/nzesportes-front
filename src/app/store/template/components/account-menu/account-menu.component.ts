import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../../shared/services/token-storage.service';
import {Customer} from '../../../../shared/models/customer.model';
import {CustomerService} from '../../../../shared/services/customer.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {

  customer: Customer | undefined;

  constructor(
    private tokenStorageService: TokenStorageService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  getCustomer(): void {
    this.customerService.getByUserId(this.tokenStorageService.getSessionUser().id)
      .subscribe(response => {
        this.customer = response;
      });
  }

}
