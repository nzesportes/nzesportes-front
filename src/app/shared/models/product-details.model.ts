import {Brand} from './brand.model';
import {Gender} from '../enums/gender';
import {Sale} from './sale.model';

export interface ProductDetails {
  id: string;
  color: string;
  size: string;
  price: number;
  description: string;
  brand: Brand;
  sale: Sale;
  gender: Gender;
  niche: string;
  status: string;
  stock: Stock[];
  productId: string;
  stockToAdd: any[];
}

export interface ProductDetailUpdateTO {
  id: string;
  color: string;
  size: string;
  price: number;
  description: string;
  brand: Brand;
  sale: Sale;
  gender: Gender;
  niche: string;
  status: string;
  stock: Stock[];
  productId: string;
  stockToAdd: any[];
}

export interface Stock {
  id: string;
  size: string;
  quantity: number;
}

