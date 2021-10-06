import {Customer} from './customer.model';

export interface Rating {
  id: string;
  customer: Customer;
  productId: string;
  purchaseId: string;
  rate: number;
  comment: string;
  creationDate: Date;
}
