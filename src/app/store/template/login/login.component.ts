import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {AuthService} from '../../../shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationRequest} from '../../../shared/models/authentication-request.model';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  // @ts-ignore
  formLogin: FormGroup;
  authenticationRequest: AuthenticationRequest = {
    username: '',
    password: ''
  };

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  changePassword(inputPassword: HTMLInputElement): void {
    if (inputPassword.type === 'password') {
      inputPassword.type = 'text';
      return;
    }
    inputPassword.type = 'password';
  }

  get validateFields(): any {
    return this.formLogin.controls;
  }

  singIn(): void {
    this.authenticationRequest.username = this.formLogin.get('email')?.value;
    this.authenticationRequest.password = this.formLogin.get('password')?.value;
    this.tokenStorageService.authenticateUserSession(this.authenticationRequest)
      .pipe(take(1))
      .subscribe(() => {
        console.log('Logado com sucesso');
        window.location.reload();
      }, error => {
        console.log(error);
      });
  }
}
