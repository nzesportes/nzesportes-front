import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {AddressService} from '../../../shared/services/address.service';
import {Address} from '../../../shared/models/address.model';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {

  isLogged = false;
  addresses: Address[] | undefined;

  constructor(
    private tokenStorageService: TokenStorageService,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.getAddressesByUser();
    this.isLogged = this.tokenStorageService.isLoggedIn();
  }

  getAddressesByUser(): void {
    this.addressService.getByUser()
      .subscribe(response => {
        this.addresses = response;
      }, error => {
        console.log(error);
      });
  }

}
