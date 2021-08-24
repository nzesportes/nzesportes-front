import {Pagination} from './pagination.model';
import {SubCategory} from '../sub-category.model';

export interface SubCategoryPage extends Pagination {
  content: SubCategory[];
}
