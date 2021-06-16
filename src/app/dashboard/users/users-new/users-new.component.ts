import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Role} from '../../../shared/enums/role.enum';
import {UserService} from '../../../shared/services/user.service';
import {take} from 'rxjs/operators';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {Brand} from '../../../shared/models/brand.model';
import {User} from '../../../shared/models/user.model';
import {ErrorWarning} from '../../../shared/models/error-warning.model';

@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.scss']
})
export class UsersNewComponent implements OnInit {
  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  public formUser: FormGroup = new FormGroup({});
  roles = Role;
  public user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.formUser = this.formBuilder.group({
      id: new FormControl(null),
      username: new FormControl(null, [Validators.required, Validators.email]),
      role: new FormControl(null, Validators.required),
    });
  }

  get validateFieldsFormUser(): { [p: string]: AbstractControl } {
    return this.formUser.controls;
  }

  cssError(field: any): any {
    return {
      'is-invalid': field.errors && field.touched
    };
  }

  save(): void {
    const request = this.user ?
      this.userService.update(this.user) :
      this.userService.save(this.formUser.value);
    request
      .pipe(take(1))
      .subscribe(() => {
        this.dialogSuccess.title = 'Usuário salvo com com sucesso!';
        this.dialogSuccess.fire();
      }, error => {
        this.setErrorDialog(error);
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.save();
          }
        });
      });
  }

  redirectToUsersPage(): void {
    this.router.navigateByUrl('/painel/usuarios');
  }

  setErrorDialog(error: ErrorWarning): void {
    this.dialogError.confirmButtonText = error.action;
    this.dialogError.title = error.title;
    this.dialogError.text = error.message;
  }
}
