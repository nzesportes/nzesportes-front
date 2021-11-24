
export interface ProductSize {
   id: string;
   name: string;
   size: string;
   chest: string;
   height: string;
   length: string;
   sleeve: string;
   shoulder: string;
   width: string;
   indicated_height: string;
   indicated_weight: string;
   image: string;
}


export interface TableSize {
  name: string;
  image: string;
  size: boolean;
  chest: boolean;
  height: boolean;
  length: boolean;
  sleeve: boolean;
  shoulder: boolean;
  width: boolean;
  indicated_height: boolean;
  indicated_weight: boolean;
  item: ProductSize[];
}
