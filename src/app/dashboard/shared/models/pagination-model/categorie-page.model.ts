import {Pagination} from './pagination.model';
import {Categorie} from '../categorie.model';

export interface CategoriePage extends Pagination {
  content: Categorie[];
}
