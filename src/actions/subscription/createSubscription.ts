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
    data: subscription,
  });
};

export default createSubscription;
