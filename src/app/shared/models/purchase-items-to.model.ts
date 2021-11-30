import {StockTO} from './stock-to.model';
import {ProductDetailsTO} from './product-details-to.model';

export interface PurchaseItemsTO {
  id: string;
  item: StockTO;
  quantity: number;
  cost: number;
  discount: number;
  productDetails: ProductDetailsTO;
}
