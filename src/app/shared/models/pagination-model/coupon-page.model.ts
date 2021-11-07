import {Pagination} from './pagination.model';
import {Coupon} from '../coupon.model';

export interface CouponPage extends Pagination{
  content: Coupon[];
}
