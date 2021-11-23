import {ProductDetails, Stock} from '../../shared/models/product-details.model';
import {SizeBetterSend} from '../../shared/models/size-better-send.model';

export interface ItemCart {
  id: string;
  productDetails: ProductDetails;
  productId: string;
  model: string;
  stock: Stock;
  quantity: number;
  size: SizeBetterSend;
  total: number;
}
