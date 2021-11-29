import {ProductDetails, Stock} from '../../shared/models/product-details.model';
import {SizeBetterSend} from '../../shared/models/size-better-send.model';
import {ProductDetailsTO} from '../../shared/models/product-details-to.model';

export interface ItemCart {
  id: string;
  productDetails: ProductDetailsTO;
  productId: string;
  model: string;
  stock: Stock;
  quantity: number;
  size: SizeBetterSend;
  total: number;
}
