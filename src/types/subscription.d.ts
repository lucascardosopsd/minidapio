import { Payment, Plan, Subscription } from "@prisma/client";
import { WithProperty } from "./common";

export interface NewSubscriptionProps {
  object: string;
  asaasId: string;
  dateCreated: string;
  customerId: string;
  value: number;
  nextDueDate: string;
  cycle: string;
  description: string;
  billingType: string;
  deleted: boolean;
  status: string;
  planId: string;
  userId: string;
}

export interface SubscriptionWithPlanProps extends Subscription {
  Plan: Plan;
}

export type SubscriptionWithPlan = WithProperty<Subscription, "Plan", Plan>;
export type PaymentWithSubscriptionWithPlan = WithProperty<
  Payment,
  "Subscription",
  SubscriptionWithPlan
>;
