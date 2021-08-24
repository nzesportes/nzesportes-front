import {ProductDetails} from './product-details.model';
import {Brand} from './brand.model';

export interface Product {
  id: string;
  model: string;
  brand: Brand;
  productDetails: ProductDetails[];
  status: boolean;
}

export interface ProductUpdateTO {
  id: string;
  model: string;
  status: boolean;
}
