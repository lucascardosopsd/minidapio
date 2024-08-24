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
