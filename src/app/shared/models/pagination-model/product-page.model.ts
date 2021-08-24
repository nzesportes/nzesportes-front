import {Pagination} from './pagination.model';
import {Product} from '../product.model';

export interface ProductPage extends Pagination {
  content: Product[];
}
