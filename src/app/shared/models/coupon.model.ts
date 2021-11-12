export interface Coupon {
  id: string;
  code: string;
  discount: number;
  quantity: number;
  status: boolean;
  startDate: Date;
  endDate: Date;
  quantityLeft: number;
}
