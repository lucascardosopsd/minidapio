"use server";
import prisma from "@/lib/prisma";

export const deleteAdvertiserAccount = async ({
  accountId,
}: {
  accountId: string;
}) => {
  return await prisma.advertiserAccount.delete({
    where: {
      id: accountId,
    },
  });
};
