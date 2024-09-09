import { Payment, Subscription } from "@prisma/client";

export type StatusType =
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

interface CreditCardDetails {
  creditCardNumber: string;
  creditCardBrand: string;
  creditCardToken: string;
}

interface DiscountDetails {
  value: number;
  limitDate: string | null;
  dueDateLimitDays: number;
  type: string;
}

interface FineDetails {
  value: number;
  type: string;
}

interface InterestDetails {
  value: number;
  type: string;
}

export interface PaymentResProps {
  object: string;
  id: string;
  dateCreated: string;
  customer: string;
  subscription: string;
  paymentLink: string | null;
  value: number;
  netValue: number;
  originalValue: number | null;
  interestValue: number | null;
  description: string;
  billingType:
    | "BOLETO"
    | "CREDIT_CARD"
    | "UNDEFINED"
    | "DEBIT_CARD"
    | "TRANSFER"
    | "DEPOSIT"
    | "PIX";
  confirmedDate: string;
  creditCard: CreditCardDetails;
  pixTransaction: string | null;
  status: StatusType;
  dueDate: string;
  originalDueDate: string;
  paymentDate: string;
  clientPaymentDate: string;
  installmentNumber: number | null;
  invoiceUrl: string;
  invoiceNumber: string;
  externalReference: string | null;
  deleted: boolean;
  anticipated: boolean;
  anticipable: boolean;
  creditDate: string;
  estimatedCreditDate: string;
  transactionReceiptUrl: string;
  nossoNumero: string | null;
  bankSlipUrl: string | null;
  lastInvoiceViewedDate: string | null;
  lastBankSlipViewedDate: string | null;
  discount: DiscountDetails;
  fine: FineDetails;
  interest: InterestDetails;
  postalService: boolean;
  custody: string | null;
  refunds: string | null;
}

export interface PaymentWithSubscriptionProps extends Payment {
  Subscription: Subscription;
}

export interface PixCodeResProps {
  encodedImage: string;
  payload: string;
  expirationDate: string;
}
