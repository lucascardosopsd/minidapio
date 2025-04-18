import { Subscription } from "@prisma/client";

export interface Plan {
  id: string;
  name: string;
  price: number;
  alias: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionWithPlanProps extends Subscription {
  Plan: Plan;
}
