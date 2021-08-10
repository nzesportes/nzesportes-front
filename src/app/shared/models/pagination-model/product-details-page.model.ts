import {Pagination} from './pagination.model';
import {ProductDetails} from '../product-details.model';

export interface ProductDetailsPage extends Pagination {
  content: ProductDetails[];
}
