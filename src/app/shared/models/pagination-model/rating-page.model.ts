import {Rating} from '../rating.model';
import {Pagination} from './pagination.model';

export interface RatingPage extends Pagination {
  content: Rating[];
}
