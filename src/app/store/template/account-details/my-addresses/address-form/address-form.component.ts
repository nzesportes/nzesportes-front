import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  // @ts-ignore
  newAddressForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

  save(): void {

  }

}
