import {Gender} from '../../shared/enums/gender';
import {Order} from '../../shared/enums/order.enum';

export interface DetailsFiltersRequest {
  gender: Gender | string;
  category: string;
  size: string;
  name: string;
  color: string;
  brand: string;
  classBy: Order | string;
  subCategory: string;
}
