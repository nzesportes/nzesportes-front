import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddressService} from '../../../../../shared/services/address.service';
import {Address} from '../../../../../shared/models/address.model';
import {Customer} from '../../../../../shared/models/customer.model';
import {TokenStorageService} from '../../../../../shared/services/token-storage.service';
import {CustomerService} from '../../../../../shared/services/customer.service';
import {CepService} from '../../../../../shared/services/cep.service';
import {ErrorWarning} from '../../../../../shared/models/error-warning.model';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  // @ts-ignore
  newAddressForm: FormGroup;

  // @ts-ignore
  address: Address;

  // @ts-ignore
  customer: Customer;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private tokerService: TokenStorageService,
    private customerService: CustomerService,
    private cepService: CepService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.customerService.getByUserId(this.tokerService.getSessionUser().id)
      .subscribe(response => {
        this.customer = response;
      }, error => {
        console.log(error);
      });
  }

  createForm(): void {
    this.newAddressForm = this.formBuilder.group({
      addressee: ['', Validators.required],
      cep: ['', Validators.required],
      street: [{value: '', disabled: true}, Validators.required],
      number: ['', Validators.required],
      complement: [''],
      referencePoint: [''],
      state: [{value: '', disabled: true}, Validators.required],
      city: [{value: '', disabled: true}, Validators.required],
      district: [{value: '', disabled: true}, Validators.required],
      phone: ['', Validators.required]
    });
  }

  searchCep(): void {
    this.cepService.findByCep(this.newAddressForm.get('cep')?.value)
      .subscribe((response: { logradouro: any; uf: any; localidade: any; bairro: any; }) => {
        this.newAddressForm.get('street')?.setValue(response.logradouro);
        this.newAddressForm.get('state')?.setValue(response.uf);
        this.newAddressForm.get('city')?.setValue(response.localidade);
        this.newAddressForm.get('district')?.setValue(response.bairro);
      });
  }

  save(): void {
    this.address = this.newAddressForm.value;
    this.address.street = this.newAddressForm.get('street')?.value;
    this.address.state = this.newAddressForm.get('state')?.value;
    this.address.city = this.newAddressForm.get('city')?.value;
    this.address.district = this.newAddressForm.get('district')?.value;
    this.address.customerId = this.customer.id;
    this.addressService.save(this.address)
      .subscribe(() => {
        this.router.navigateByUrl('/minha-conta/enderecos');
      }, (error: ErrorWarning) => {
        this.setErrorDialog(error);
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.save();
          }
        });
      });
  }

  redirect(): void {
    this.router.navigateByUrl('/minha-conta/enderecos/novo');
  }

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }
}
