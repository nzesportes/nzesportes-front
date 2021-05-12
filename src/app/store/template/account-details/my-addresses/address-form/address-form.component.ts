import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  // @ts-ignore
  newAddressForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.newAddressForm = this.formBuilder.group({
      name: ['', Validators.required],
      cep: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      referencePoint: [''],
      state: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  save(): void {
    console.log(this.newAddressForm.value);
  }

}
