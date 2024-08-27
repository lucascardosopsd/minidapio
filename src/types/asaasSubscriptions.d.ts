export interface SubscriptionProps {
  object: string;
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink: string | null;
  billingType: string;
  cycle: string;
  value: number;
  nextDueDate: string;
  description: string;
  status: "ACTIVE" | "INACTIVE" | "EXPIRED";
  deleted: boolean;
}

export interface AsaasSubscriptionObj {
  object: string;
  hasMore: boolean;
  totalCount: number;
  limit: number;
  offset: number;
  data: SubscriptionProps[];
}

interface AsaasSubscriptionResObj {
  object: "subscription";
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink: string | null;
  billingType: "BOLETO" | "CREDIT_CARD" | "PIX" | "UNDEFINED";
  cycle:
    | "WEEKLY"
    | "BIWEEKLY"
    | "MONTHLY"
    | "BIMONTHLY"
    | "QUARTERLY"
    | "SEMIANNUALLY"
    | "YEARLY";
  value: number;
  nextDueDate: string;
  description: string;
  status: "ACTIVE" | "INACTIVE" | "EXPIRED";
  discount: {
    value: number;
    dueDateLimitDays: number;
    type?: "FIXED" | "PERCENTAGE";
  };
  fine: {
    value: number;
  };
  interest: {
    value: number;
  };
  deleted: boolean;
  split?: {
    status: "PENDING" | "AWAITING_CREDIT" | "CANCELLED" | "DONE" | "REFUNDED";
    cancellationReason?:
      | "PAYMENT_DELETED"
      | "PAYMENT_OVERDUE"
      | "PAYMENT_RECEIVED_IN_CASH"
      | "PAYMENT_REFUNDED";
  };
}
