import prisma from "@/lib/prisma";
import { Plan, Subscription } from "@prisma/client";

export interface SubscriptionWithPlan extends Subscription {
  Plan: Plan | null;
}

export const fetchUserSubscriptions = async ({
  userId,
}: {
  userId: string;
}): Promise<SubscriptionWithPlan[]> => {
  return prisma.subscription.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      Plan: true,
    },
  });
};
