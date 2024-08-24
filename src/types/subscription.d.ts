export interface NewSubscriptionProps {
  object: string;
  asaasId: string;
  dateCreated: string;
  customer: string;
  value: number;
  nextDueDate: string;
  cycle: string;
  description: string;
  billingType: string;
  deleted: boolean;
  status: string;
  userId?: string;
}
