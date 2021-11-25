import {PurchaseItemsTO} from './purchase-items-to.model';
import {PaymenteRequestTO} from './paymente-request-to.model';
import {MercadoPagoPaymentStatus} from '../enums/mercado-pago-payment-status.enum';
import {AddressTO} from './address-to.model';
import {Customer} from './customer.model';
import {ProductDetails} from './product-details.model';
import {ProductDetailsTO} from './product-details-to.model';
import {Coupon} from './coupon.model';

export interface Purchase {
  id: string;
  items: PurchaseItemsTO[];
  shipment: number;
  shipmentAddress: AddressTO;
  totalCost: number;
  status: MercadoPagoPaymentStatus;
  paymentRequest: PaymenteRequestTO;
  customer: Customer;
  isLoaded: boolean;
  coupon: Coupon;
  code: number;
  tag: boolean;
}
