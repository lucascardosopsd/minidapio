import prisma from "@/lib/prisma";

export const fetchUserSubscriptions = async ({
  userId,
}: {
  userId: string;
}) => {
  return prisma.subscription.findMany({
    where: { userId },
    orderBy: {
      dateCreated: "desc",
    },
  });
};
