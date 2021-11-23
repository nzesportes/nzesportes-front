import {Pagination} from './pagination.model';
import {SizeBetterSend} from '../size-better-send.model';

export interface SizeBetterSendPage extends Pagination {
  content: SizeBetterSend[];
}
