import {Brand} from './brand.model';

export interface SubCategory {
  id: string;
  name: string;
}

export interface SubMenu {
  name: string;
  subCategory: SubCategory[];
}

export interface Menu {
  masculino: SubMenu[];
  feminino: SubMenu[];
  marcas: Brand[];
}
