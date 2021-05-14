import {Pageable} from './pegeable.model';

export interface Pagination {
  pageable: Pageable;
  totalPages: number;
  last: boolean;
  size: number;
  totalElements: number;
}
