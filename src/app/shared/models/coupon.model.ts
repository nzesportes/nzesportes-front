export interface Coupon {
  id: string;
  code: string;
  discount: number;
  quantity: number;
  startDate: Date;
  endDate: Date;
  quantityLeft: number;
}
