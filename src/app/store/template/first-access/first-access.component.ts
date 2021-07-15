import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChangePasswordTO} from '../../../shared/models/change-password-TO.model';
import {take} from 'rxjs/operators';
import {AuthService} from '../../../shared/services/auth.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-first-access',
  templateUrl: './first-access.component.html',
  styleUrls: ['./first-access.component.scss']
})
export class FirstAccessComponent implements OnInit {

  // @ts-ignore
  formFirstAccess: FormGroup;
  // @ts-ignore
  changePasswordTO: ChangePasswordTO;
  id = '';

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
    });
    this.createForm();
  }

  createForm(): void {
    this.formFirstAccess = this.formBuilder.group({
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
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
    this.authService.firstAccess(this.id, this.changePasswordTO, 'recovery')
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['']);
      }, error => {
        console.log(error);
      });
  }
}
