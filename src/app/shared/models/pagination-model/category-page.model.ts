import {Pagination} from './pagination.model';
import {Category} from '../category.model';

export interface CategoryPage extends Pagination {
  content: Category[];
}
