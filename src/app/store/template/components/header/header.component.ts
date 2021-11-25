import {Component, OnInit} from '@angular/core';
import {AuthenticationResponse} from '../../../../shared/models/authentication-response.model';
import {TokenStorageService} from '../../../../shared/services/token-storage.service';
import {CustomerService} from '../../../../shared/services/customer.service';
import {take} from 'rxjs/operators';
import {Customer} from '../../../../shared/models/customer.model';
import {Role} from '../../../../shared/enums/role.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authenticationResponse: AuthenticationResponse | undefined;
  customer: Customer | undefined;

  isLogged = false;
  isAdmin = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {
    this.getUser();
    this.isLogged = this.tokenStorageService.isLoggedIn() ? true : false;
    this.isAdmin = !this.tokenStorageService.getSessionUser().roles.includes(Role.ROLE_USER);
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
          console.log('error header account');
        });
    }
  }
}
