import {ProductDetailsTO} from './product-details-to.model';

export interface StockTO {
  id: string;
  size: string;
  productDetail: ProductDetailsTO;
}
