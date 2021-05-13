import {TypeCategorie} from '../enums/type-categorie';

export interface Categorie {
  id: string;
  name: string;
  type: TypeCategorie[];
}
