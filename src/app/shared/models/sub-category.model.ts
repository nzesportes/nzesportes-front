import {Gender} from '../enums/gender';
import {Category} from './category.model';

export interface SubCategory {
  id: string;
  name: string;
  gender: Gender;
  status: boolean;
  hasLoop?: boolean;
  categoryId: string;
  category?: Category;
  categories?: [];
  onMenu: boolean;
}


