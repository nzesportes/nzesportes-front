export interface Sale {
  id: string;
  percentage: number;
  quantity: number;
  startDate: Date;
  endDate: Date;
  quantityLeft: number;
  status: boolean;
  productDetailId: string;
}
