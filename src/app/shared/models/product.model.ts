import {Category} from './category.model';
import {ProductDetails} from './product-details.model';

export interface Product {
  id: string;
  description: string;
  model: string;
  category: Category[];
  productDetails: ProductDetails[];
  status: boolean;
}
