import {Pagination} from './pagination.model';
import {Customer} from '../customer.model';

export interface CustomerPage extends Pagination {
  content: Customer[];
}
