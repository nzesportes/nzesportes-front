export interface Shipping {
  from: From;
  to: To;
  products: ProductShipping[];
}

export interface From {
  postal_code: string;
}
export interface To {
  postal_code: string;
}

export interface ProductShipping {
  id: string;
  width: number;
  height: number;
  length: number;
  weight: number;
  insurance_value: number;
  quantity: number;
}
