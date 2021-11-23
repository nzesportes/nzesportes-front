import {ProductDetails} from './product-details.model';
import {Brand} from './brand.model';
import {SizeBetterSendPage} from './pagination-model/size-better-send-page.model';
import {SizeBetterSend} from './size-better-send.model';

export interface Product {
  id: string;
  model: string;
  brand: Brand;
  productDetails: ProductDetails[];
  status: boolean;
  size: SizeBetterSend;
}

export interface ProductUpdateTO {
  id: string;
  model: string;
  status: boolean;
  // sizeId?: string;
}
