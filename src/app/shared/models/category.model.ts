import {TypeCategorie} from '../enums/type-categorie';

export interface Category {
  id: string;
  name: string;
  status: boolean;
  type: TypeCategorie[];
  onMenu: boolean;
}
