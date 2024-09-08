interface RefundProps {
  id: string;
  customer: string;
  dateCreated: Date;
  dueDate: Date;
  installment?: string;
  subscription?: string;
  paymentLink?: string;
  value: number;
  netValue?: number;
  billingType:
    | "BOLETO"
    | "CREDIT_CARD"
    | "UNDEFINED"
    | "DEBIT_CARD"
    | "TRANSFER"
    | "DEPOSIT"
    | "PIX";
  status:
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
  description?: string;
  externalReference?: string;
  canBePaidAfterDueDate?: boolean;
  pixTransaction?: string;
  pixQrCodeId?: string;
  originalValue?: number;
  interestValue?: number;
  originalDueDate?: Date;
  paymentDate?: Date;
  clientPaymentDate?: Date;
  installmentNumber?: string;
  transactionReceiptUrl?: string;
  nossoNumero?: string;
  invoiceUrl?: string;
  bankSlipUrl?: string;
  invoiceNumber?: string;
  discount?: {
    value: number;
    dueDateLimitDays?: number;
    type: "FIXED" | "PERCENTAGE";
  };
  fine?: {
    value: number;
  };
  interest?: {
    value: number;
  };
  deleted?: boolean;
  postalService?: boolean;
  anticipated?: boolean;
  anticipable?: boolean;
  refunds?: {
    dateCreated: Date;
    status:
      | "PENDING"
      | "AWAITING_CRITICAL_ACTION_AUTHORIZATION"
      | "CANCELLED"
      | "DONE";
    value: number;
    description?: string;
    transactionReceiptUrl?: string;
  }[];
  split?: {
    id: string;
    walletId: string;
    fixedValue?: number;
    percentualValue?: number;
    totalValue?: number;
    cancellationReason?:
      | "PAYMENT_DELETED"
      | "PAYMENT_OVERDUE"
      | "PAYMENT_RECEIVED_IN_CASH"
      | "PAYMENT_REFUNDED";
    status: "PENDING" | "AWAITING_CREDIT" | "CANCELLED" | "DONE" | "REFUNDED";
  }[];
  chargeback?: {
    status: "REQUESTED" | "IN_DISPUTE" | "DISPUTE_LOST" | "REVERSED" | "DONE";
    reason:
      | "ABSENCE_OF_PRINT"
      | "ABSENT_CARD_FRAUD"
      | "CARD_ACTIVATED_PHONE_TRANSACTION"
      | "CARD_FRAUD"
      | "CARD_RECOVERY_BULLETIN"
      | "COMMERCIAL_DISAGREEMENT"
      | "COPY_NOT_RECEIVED"
      | "CREDIT_OR_DEBIT_PRESENTATION_ERROR"
      | "DIFFERENT_PAY_METHOD"
      | "FRAUD"
      | "INCORRECT_TRANSACTION_VALUE"
      | "INVALID_CURRENCY"
      | "INVALID_DATA"
      | "LATE_PRESENTATION"
      | "LOCAL_REGULATORY_OR_LEGAL_DISPUTE"
      | "MULTIPLE_ROCS"
      | "ORIGINAL_CREDIT_TRANSACTION_NOT_ACCEPTED"
      | "OTHER_ABSENT_CARD_FRAUD"
      | "PROCESS_ERROR"
      | "RECEIVED_COPY_ILLEGIBLE_OR_INCOMPLETE"
      | "RECURRENCE_CANCELED"
      | "REQUIRED_AUTHORIZATION_NOT_GRANTED"
      | "RIGHT_OF_FULL_RECOURSE_FOR_FRAUD"
      | "SALE_CANCELED"
      | "SERVICE_DISAGREEMENT_OR_DEFECTIVE_PRODUCT"
      | "SERVICE_NOT_RECEIVED"
      | "SPLIT_SALE"
      | "TRANSFERS_OF_DIVERSE_RESPONSIBILITIES"
      | "UNQUALIFIED_CAR_RENTAL_DEBIT"
      | "USA_CARDHOLDER_DISPUTE"
      | "VISA_FRAUD_MONITORING_PROGRAM"
      | "WARNING_BULLETIN_FILE";
  };
}
