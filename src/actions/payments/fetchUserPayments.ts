import prisma from "@/lib/prisma";

export const fetchUserPayments = async ({ userId }: { userId: string }) => {
  return prisma.payment.findMany({
    where: { userId },
  });
};
