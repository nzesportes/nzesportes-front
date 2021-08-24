import {Component, OnInit, ViewChild} from '@angular/core';
import {AddressService} from '../../../../../shared/services/address.service';
import {Address} from '../../../../../shared/models/address.model';
import {take} from 'rxjs/operators';
import {ErrorWarning} from '../../../../../shared/models/error-warning.model';
import {Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  // @ts-ignore
  addresses: Address[];

  constructor(
    private addressService: AddressService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getByUser();
  }

  getByUser(): void {
    this.addressService.getByUser()
      .subscribe(response => {
        this.addresses = response;
      }, error => {
        console.log(error);
      });
  }

  removeAddress(id: string): void {
    this.addressService.deleteById(id)
      .pipe(take(1))
      .subscribe(() => {
        this.addresses = this.addresses.filter(a => a.id !== id);
      }, (error: ErrorWarning) => {
        this.setErrorDialog(error);
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.removeAddress(id);
          }
        });
      });
  }

  redirect(): void {
    this.router.navigateByUrl('/minha-conta/enderecos');
  }

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }
}
