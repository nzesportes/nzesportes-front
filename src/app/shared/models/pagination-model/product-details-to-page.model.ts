import {ProductDetailsTO} from '../product-details-to.model';
import {Pagination} from './pagination.model';

export interface ProductDetailsTOPage extends Pagination{
  content: ProductDetailsTO[];
}
