import {Brand} from './brand.model';

export interface ProductTO {
  id: string;
  model: string;
  brand: Brand;
  status: boolean;
}
