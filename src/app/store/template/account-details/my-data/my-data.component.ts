import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../../shared/services/token-storage.service';
import {CustomerService} from '../../../../shared/services/customer.service';
import {Customer} from '../../../../shared/models/customer.model';
import {AuthenticationResponse} from '../../../../shared/models/authentication-response.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})
export class MyDataComponent implements OnInit {

  authenticationResponse: AuthenticationResponse | undefined;
  customer: Customer | undefined;

  constructor(
    private tokenStorageService: TokenStorageService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.authenticationResponse = this.tokenStorageService.getSessionUser();
    this.customerService.getByUserId(this.authenticationResponse.id)
      .pipe(take(1))
      .subscribe(response => {
        this.customer = response;
      }, error => {
        console.log(error);
      });
  }
}
