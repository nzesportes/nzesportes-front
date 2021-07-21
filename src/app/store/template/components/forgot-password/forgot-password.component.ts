import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {AuthenticationRequest} from '../../../../shared/models/authentication-request.model';
import {Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {ErrorWarning} from '../../../../shared/models/error-warning.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  // @ts-ignore
  forgotPasswordForm: FormGroup;
  authenticationRequest: AuthenticationRequest = {
    username: '',
    password: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }


  private createForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get validateFields(): any {
    return this.forgotPasswordForm.controls;
  }

  forgotMyPassword(): void {
    this.authenticationRequest.username = this.forgotPasswordForm?.get('email')?.value;
    this.authService.createFlow(this.authenticationRequest, 'recovery')
      .pipe(take(1))
      .subscribe(() => {
        this.dialogSuccess.title = 'E-mail enviado com sucesso!';
        this.dialogSuccess.fire();
      }, (error: ErrorWarning) => {
        this.setErrorDialog(error);
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.forgotMyPassword();
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

