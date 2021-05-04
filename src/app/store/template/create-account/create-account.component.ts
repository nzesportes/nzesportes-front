import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../../../shared/services/customer.service';
import {User} from '../../../shared/models/user.model';
import {Role} from '../../../shared/enums/role.enum';
import {AuthService} from '../../../shared/services/auth.service';
import {Customer} from '../../../shared/models/customer.model';
import {AuthenticationRequest} from '../../../shared/models/authentication-request.model';
import {take} from 'rxjs/operators';
import {TokenStorageService} from '../../../shared/services/token-storage.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  // @ts-ignore
  createAccount: FormGroup;

  user: User = {
    id: '',
    username: '',
    password: '',
    role: Role.ADMIN
  };

  customer: Customer = {
    id: '',
    cpf: '',
    birthDate: new Date(),
    instagram: '',
    name: '',
    lastName: '',
    phone: '',
    userId: ''
  };

  authenticationRequest: AuthenticationRequest = {
    username: '',
    password: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private tokenStorageService: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  cssError(field: any): any {
    return {
      'is-invalid': field.invalid && field.touched
    };
  }


  private createForm(): void {
    this.createAccount = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
      cpf: ['', Validators.required],
      instagram: [''],
      birthDate: [''],
      phone: ['', Validators.required],
      gender: ['']
    });
  }

  changePassword(inputPassword: HTMLInputElement): void {
    if (inputPassword.type === 'password') {
      inputPassword.type = 'text';
      return;
    }
    inputPassword.type = 'password';
  }

  checkPasswords(group: FormGroup): any { // here we have the 'passwords' group
    const password = group.controls.password.value;
    const passwordRepeat = group.controls.passwordRepeat.value;

    return password === passwordRepeat ? null : {notSame: true};
  }

  save(): void {
    this.authenticationRequest.username = this.createAccount.get('email')?.value;
    this.authenticationRequest.password = this.createAccount.get('password')?.value;

    this.tokenStorageService.registerUserSession(this.authenticationRequest)
      .pipe(
        take(1)
      ).subscribe(response => {
      this.customer.cpf = this.createAccount.get('cpf')?.value;
      this.customer.birthDate = this.createAccount.get('birthDate')?.value;
      this.customer.instagram = '@' + this.createAccount.get('instagram')?.value;
      this.customer.name = this.createAccount.get('name')?.value;
      this.customer.lastName = this.createAccount.get('lastname')?.value;
      this.customer.phone = this.createAccount.get('phone')?.value;
      this.customer.userId = response.id;

      this.customerService.create(this.customer)
        .pipe(take(1)).subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

}
