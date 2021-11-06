import {StockTO} from './stock-to.model';

export interface PurchaseItemsTO {
  id: string;
  item: StockTO;
  quantity: number;
  cost: number;
}
