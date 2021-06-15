import {Pagination} from './pagination.model';
import {User} from '../user.model';

export interface UserPage extends Pagination {
  content: User[];
}
