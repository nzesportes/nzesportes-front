import {Category} from './category.model';
import {ProductDetails} from './product-details.model';
import {Brand} from './brand.model';

export interface Product {
  id: string;
  description: string;
  model: string;
  brand: Brand;
  category: Category[];
  productDetails: ProductDetails[];
  status: boolean;
}

export interface ProductUpdateTO {
  id: string;
  description: string;
  model: string;
  status: boolean;
}
