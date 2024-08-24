"use server";

import prisma from "@/lib/prisma";
import { NewSubscriptionProps } from "@/types/subscription";

interface CreatesubscriptionProps {
  subscription: NewSubscriptionProps;
  userId: string;
}

const createSubscription = async ({
  subscription,
  userId,
}: CreatesubscriptionProps) => {
  return await prisma.subscription.create({
    data: subscription,
  });
};

export default createSubscription;
