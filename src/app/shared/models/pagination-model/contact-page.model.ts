import {Contact} from '../contact.model';
import {Pagination} from './pagination.model';

export interface ContactPage extends Pagination {
  content: Contact[];
}
