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
  public hasError = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.hasError = false;
    this.getCustomer();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  getCustomer(): void {
    if (this.tokenStorageService.getSessionUser() && this.tokenStorageService.getSessionUser().id){
      this.customerService.getByUserId(this.tokenStorageService.getSessionUser().id)
        .subscribe(response => {
          this.customer = response;
          this.hasError = false;
        }, error => {
          this.hasError = true;
        });
    }else {
      console.log('error menu account');
      this.hasError = true;
    }

  }

}
