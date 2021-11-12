import {Pagination} from './pagination.model';
import {Purchase} from '../purchase.model';

export interface PurchasePage extends Pagination {
  content: Purchase[];
}
