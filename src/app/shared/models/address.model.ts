import {Customer} from './customer.model';

export interface Address {
  id: string;
  addressee: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  reference: string;
  state: string;
  city: string;
  district: string;
  phone: string;
  customer: Customer;
}
