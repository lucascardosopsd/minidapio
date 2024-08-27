"use server";
import prisma from "@/lib/prisma";

interface deleteSubscriptionProps {
  id: string;
}

export const deleteSubscription = async ({ id }: deleteSubscriptionProps) => {
  return await prisma.subscription.delete({ where: { id } });
};
