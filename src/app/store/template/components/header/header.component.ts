import {Component, OnInit} from '@angular/core';
import {AuthenticationResponse} from '../../../../shared/models/authentication-response.model';
import {TokenStorageService} from '../../../../shared/services/token-storage.service';
import {CustomerService} from '../../../../shared/services/customer.service';
import {take} from 'rxjs/operators';
import {Customer} from '../../../../shared/models/customer.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authenticationResponse: AuthenticationResponse | undefined;
  customer: Customer | undefined;

  isLogged = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {
    this.getUser();
    this.isLogged = this.tokenStorageService.isLoggedIn() ? true : false;
  }

  getUser(): void {
    if (this.tokenStorageService.isLoggedIn()) {
      this.authenticationResponse = this.tokenStorageService.getSessionUser();
      this.customerService.getByUserId(this.authenticationResponse.id)
        .pipe(take(1))
        .subscribe(response => {
          this.customer = response;
        }, error => {
          this.customer = undefined;
          console.log(error);
        });
    }
  }
}
