import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import validator from 'cpf-cnpj-validator';
import {ChangePasswordTO} from '../../../../shared/models/change-password-TO.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  // @ts-ignore
  formChangePassword: FormGroup;
  // @ts-ignore
  changePasswordTO: ChangePasswordTO;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
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
        window.location.reload();
      }, error => {
        console.log(error);
      });
  }
}
