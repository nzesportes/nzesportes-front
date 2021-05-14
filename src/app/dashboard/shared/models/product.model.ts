import {Categorie} from './categorie.model';
import {ProductDetails} from './product-details.mode';

export interface Product {
  id: string;
  description: string;
  model: string;
  category: Categorie[];
  productDetails: ProductDetails[];
  status: boolean;
}
