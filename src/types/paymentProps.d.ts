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
  status: string;
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
}

export interface BarCodeCodeResProps {
  identificationField: string;
  nossoNumero: string;
  barCode: string;
}
