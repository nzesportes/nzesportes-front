import {Customer} from './customer.model';

export interface Rating {
  id: string;
  title: string;
  customer: Customer;
  productId: string;
  purchaseId: string;
  rate: number;
  comment: string;
  creationDate: Date;
}
