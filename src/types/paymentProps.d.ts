type StatusType =
  | "PENDING"
  | "RECEIVED"
  | "CONFIRMED"
  | "OVERDUE"
  | "REFUNDED"
  | "RECEIVED_IN_CASH"
  | "REFUND_REQUESTED"
  | "REFUND_IN_PROGRESS"
  | "CHARGEBACK_REQUESTED"
  | "CHARGEBACK_DISPUTE"
  | "AWAITING_CHARGEBACK_REVERSAL"
  | "DUNNING_REQUESTED"
  | "DUNNING_RECEIVED"
  | "AWAITING_RISK_ANALYSIS";

export interface PaymentResProps {
  object: string;
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink: string | null;
  dueDate: string;
  value: number;
  netValue: number;
  billingType: string;
  canBePaidAfterDueDate: boolean;
  pixTransaction: string | null;
  status: StatusType;
  description: string;
  externalReference: string;
  originalValue: number | null;
  interestValue: number | null;
  originalDueDate: string;
  paymentDate: string | null;
  clientPaymentDate: string | null;
  installmentNumber: string | null;
  transactionReceiptUrl: string | ull;
  nossoNumero: string;
  invoiceUrl: string;
  bankSlipUrl: string;
  invoiceNumber: string;
  discount: {
    value: number;
    dueDateLimitDays: number;
  };
  fine: {
    value: number;
  };
  interest: {
    value: number;
  };
  deleted: boolean;
  postalService: boolean;
  anticipated: boolean;
  anticipable: boolean;
  refunds: number | null;
}

export interface PixCodeResProps {
  encodedImage: string;
  payload: string;
  expirationDate: string;
  image: Image;
}

export interface BarCodeCodeResProps {
  identificationField: string;
  nossoNumero: string;
  barCode: string;
}
