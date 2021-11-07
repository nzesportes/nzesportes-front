import {Pagination} from './pagination.model';
import {Sale} from '../sale.model';

export interface SalePage extends Pagination {
  content: Sale[];
}
