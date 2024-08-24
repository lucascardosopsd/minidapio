import { Subscription } from "@prisma/client";
import prisma from "@/lib/prisma";

interface CreatesubscriptionProps {
  subscription: Subscription;
  userId: string;
}

const createSubscription = async ({
  subscription,
  userId,
}: CreatesubscriptionProps) => {
  return await prisma.subscription.create({
    data: {
      ...subscription,
      userId,
    },
  });
};

export default createSubscription;
