import {Component, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from '../../../../shared/services/token-storage.service';
import {AuthService} from '../../../../shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationRequest} from '../../../../shared/models/authentication-request.model';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {ErrorWarning} from '../../../../shared/models/error-warning.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

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
        window.location.reload();
      }, (error: ErrorWarning) => {
        this.setErrorDialog(error);
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.singIn();
          }
        });
      });
  }

  redirect(): void {
    this.router.navigateByUrl('/');
  }

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }
}
