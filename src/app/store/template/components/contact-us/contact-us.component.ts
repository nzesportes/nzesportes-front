import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../../../shared/services/contact.service';
import {Contact} from '../../../../shared/models/contact.model';
import {take} from 'rxjs/operators';
import {ErrorWarning} from '../../../../shared/models/error-warning.model';
import {Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  @ViewChild('success')
  public readonly dialogSuccess!: SwalComponent;
  @ViewChild('error')
  public readonly dialogError!: SwalComponent;

  // @ts-ignore
  formContact: FormGroup;

  // @ts-ignore
  contact: Contact;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formContact = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      instagram: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  save(): void {
    this.contact = this.formContact?.value;
    this.contactService.save(this.contact)
      .pipe(take(1))
      .subscribe(() => {
        this.formContact.reset();
        this.dialogSuccess.title = 'Formulário enviado com sucesso!';
        this.dialogSuccess.fire();
      }, (error: ErrorWarning) => {
        this.setErrorDialog(error);
        this.dialogError.fire().then(r => {
          if (r.isConfirmed) {
            this.save();
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
