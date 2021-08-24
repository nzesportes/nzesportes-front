import {ProductDetails, Stock} from '../../shared/models/product-details.model';

export interface ItemCart {
  id: string;
  productDetails: ProductDetails;
  productId: string;
  model: string;
  stock: Stock;
  quantity: number;
  total: number;
}
