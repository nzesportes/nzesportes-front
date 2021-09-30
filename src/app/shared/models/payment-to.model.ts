import {ProductPaymentTO} from './product-payment-to.model';

export interface PaymentTO {
  products: ProductPaymentTO[];
  shipment: number;
  shipmentId: string;
}
