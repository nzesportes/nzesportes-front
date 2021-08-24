import {Gender} from '../enums/gender';
import {Category} from './category.model';

export interface SubCategory {
  id: string;
  name: string;
  gender: Gender;
  status: boolean;
  categories: Category[];
  categoriesToAdd: string[];
  categoriesToRemove: string[];
  hasLoop?: boolean;
}


