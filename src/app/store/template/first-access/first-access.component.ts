import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChangePasswordTO} from '../../../shared/models/change-password-TO.model';
import {take} from 'rxjs/operators';
import {AuthService} from '../../../shared/services/auth.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {ErrorWarning} from '../../../shared/models/error-warning.model';

@Component({
  selector: 'app-first-access',
  templateUrl: './first-access.component.html',
  styleUrls: ['./first-access.component.scss']
})
export class FirstAccessComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  // @ts-ignore
  formFirstAccess: FormGroup;
  // @ts-ignore
  changePasswordTO: ChangePasswordTO;
  id = '';
  flow = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams.id;
      this.flow = urlParams.flow;
    });
    this.createForm();
  }

  createForm(): void {
    this.formFirstAccess = this.formBuilder.group({
        newPassword: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{8,}$')
        ]],
        repeatPassword: ['', Validators.required]
      },
      {
        validator: this.checkPasswords('newPassword', 'repeatPassword')
      });
  }

  get validateFields(): any {
    return this.formFirstAccess.controls;
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
    this.changePasswordTO = this.formFirstAccess.value;
    this.authService.firstAccess(this.id, this.changePasswordTO, this.flow)
      .pipe(take(1))
      .subscribe(() => {
        this.formFirstAccess.reset();
        this.dialogSuccess.title = 'Senha criada com sucesso!';
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
