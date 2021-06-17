import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../../../shared/services/contact.service';
import {Contact} from '../../../../shared/models/contact.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  // @ts-ignore
  formContact: FormGroup;

  // @ts-ignore
  contact: Contact;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
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
      .subscribe(response => console.log(response),
        error => console.log(error));

  }
}
