import {Category} from './category.model';
import {ProductDetails} from './product-details.model';
import {Brand} from './brand.model';
import {Sale} from './sale.model';
import {Gender} from '../enums/gender';

export interface ProductsStore {
  id: string;
  description: string;
  model: string;
  idProductDetails: string;
  color: string;
  size: string;
  price: number;
  brand: Brand;
  sale: Sale;
  gender: Gender;
  niche: string;
  status: string;
}
