import {ProductDetails, Stock} from './product-details.model';

export interface ItemCart {
  idProduct: string;
  stocks: Stock[];

}
