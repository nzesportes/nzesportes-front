import {Brand} from './brand.model';
import {Gender} from '../enums/gender';
import {Sale} from './sale.model';
import {SubCategory} from './sub-category.model';

export interface ProductDetails {
  id: string;
  color: string;
  size: string;
  price: number;
  description: string;
  images: string;
  brand: Brand;
  sale: Sale;
  gender: Gender;
  status: string;
  stock: Stock[];
  productId: string;
  stockToAdd: any[];
  subCategories: SubCategory[];
  subCategoriesToAdd: string[];
  subCategoriesToRemove: string[];
}

export interface ProductDetailUpdateTO {
  id: string;
  color: string;
  size: string;
  price: number;
  description: string;
  images: string;
  brand: Brand;
  sale: Sale;
  gender: Gender;
  status: string;
  stock: Stock[];
  productId: string;
  stockToAdd: any[];
  subCategories: SubCategory[];
  subCategoriesToAdd: string[];
  subCategoriesToRemove: string[];
}

export interface Stock {
  id: string;
  size: string;
  quantity: number;
}

