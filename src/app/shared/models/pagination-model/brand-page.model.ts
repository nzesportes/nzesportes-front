import {Pagination} from './pagination.model';
import {Brand} from '../brand.model';

export interface BrandPage extends Pagination {
  content: Brand[];
}
