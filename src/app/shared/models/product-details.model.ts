import {Brand} from './brand.model';
import {Gender} from '../enums/gender';
import {Sale} from './sale.model';

export interface ProductDetails {
  id: string;
  color: string;
  size: string;
  price: number;
  brand: Brand;
  sale: Sale;
  gender: Gender;
  niche: string;
  status: string;
}

export interface ProductDetailUpdateTO {
  id: string;
  color: string;
  size: string;
  price: number;
  brand: Brand;
  sale: Sale;
  gender: Gender;
  niche: string;
  status: string;
}

