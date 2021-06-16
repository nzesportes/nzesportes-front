import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Role} from '../../../shared/enums/role.enum';

@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.scss']
})
export class UsersNewComponent implements OnInit {
  public formUser: FormGroup = new FormGroup({});
  roles = Role;
  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.formUser = this.formBuilder.group({
      id: new FormControl(null),
      username: new FormControl(null,  [Validators.required, Validators.email]),
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
}
