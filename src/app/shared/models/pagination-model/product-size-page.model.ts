import {Pagination} from './pagination.model';
import {ProductSize} from '../product-size.model';

export interface ProductSizePage extends Pagination {
  content: ProductSize[];
}
