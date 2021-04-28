import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  // @ts-ignore
  createAccount: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  cssError(campo: any): any {
    return {
      'is-invalid': campo.invalid && campo.touched
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

  save(): void {
    console.log(this.createAccount.value);
  }

}
