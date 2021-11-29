import {Stock} from './product-details.model';
import {Purchase} from './purchase.model';

export interface PurchaseItems {
  id: string;
  item: Stock;
  purchase: Purchase;
  quantity: number;
  cost: number;
  discount: number;
  available: boolean;
}
