import {Sale} from './sale.model';
import {Stock} from './product-details.model';
import {SubCategory} from './sub-category.model';
import {ProductTO} from './product-to.model';

export interface ProductDetailsTO {
  id: string;
  color: string;
  price: number;
  description: string;
  sale: Sale;
  status: boolean;
  images: string;
  productId: string;
  stock: Stock[];
  subCategories: SubCategory[];
  product: ProductTO;
  purchaseStockId: string;
  creationDate: Date;
}
