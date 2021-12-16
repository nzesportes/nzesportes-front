export enum MercadoPagoPaymentStatus {
  PENDING = 'pending', // The user has not yet completed the payment process.
  APPROVED = 'approved', // The user has not yet completed the payment process.
  AUTHORIZED = 'authorized', // The payment has been authorized but not captured yet.
  IN_PROCESS = 'in_process', // Payment is being reviewed.
  IN_MEDIATION = 'in_mediation', // Users have initiated a dispute.
  REJECTED = 'rejected', // Payment was rejected. The user may retry payment.
  CANCELLED = 'cancelled', // Payment was cancelled by one of the parties or because time for payment has expired
  REFUNDED = 'refunded', // Payment was refunded to the user.
  CHARGED_BACK = 'charged_back' // Was made a chargeback in the buyer’s credit card.
}

export enum PaymentStatusPt {
  'pending' = 'pendente',
  'approved' = 'aprovado',
  'authorized' = 'não autorizado',
  'in_process' = 'processando',
  'in_mediation' = 'processando',
  'rejected' = 'rejeitado',
  'cancelled' = 'cancelado',
  'refunded' = 'pagamento foi devolvido',
  'charged_back' = 'processando'
}
