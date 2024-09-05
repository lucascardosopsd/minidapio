import { Subscription } from "@prisma/client";

export interface SubscriptionWithPlanProps extends Subscription {
  Plan: Plan;
}
