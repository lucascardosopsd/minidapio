"use server";

import prisma from "@/lib/prisma";
import { NewSubscriptionProps } from "@/types/subscription";

interface CreatesubscriptionProps {
  subscription: NewSubscriptionProps;
}

const createSubscription = async ({
  subscription,
}: CreatesubscriptionProps) => {
  return await prisma.subscription.create({
    data: {
      ...subscription,
      currentPeriodEnd: new Date(subscription.nextDueDate || new Date().setMonth(new Date().getMonth() + 1)),
      status: subscription.status || "active",
    },
  });
};

export default createSubscription;
