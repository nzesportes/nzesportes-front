import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import validator from 'cpf-cnpj-validator';
import {ChangePasswordTO} from '../../../../shared/models/change-password-TO.model';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {ErrorWarning} from '../../../../shared/models/error-warning.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  // @ts-ignore
  formChangePassword: FormGroup;
  // @ts-ignore
  changePasswordTO: ChangePasswordTO;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formChangePassword = this.formBuilder.group({
        currentPassword: ['', [Validators.required, Validators.minLength(8)]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', Validators.required]
      },
      {
        validator: this.checkPasswords('newPassword', 'repeatPassword')
      });
  }

  get validateFields(): any {
    return this.formChangePassword.controls;
  }

  private checkPasswords(controlName: string, matchingControlName: string): Validators {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  changePassword(): void {
    this.changePasswordTO = this.formChangePassword.value;
    this.authService.changePassword(this.changePasswordTO)
      .pipe(take(1))
      .subscribe(() => {
        this.formChangePassword.reset();
        this.dialogSuccess.title = 'Senha trocada com sucesso!';
        this.dialogSuccess.fire();
      }, (error: ErrorWarning) => {
      this.setErrorDialog(error);
      this.dialogError.fire().then(r => {
        if (r.isConfirmed) {
          this.changePassword();
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
