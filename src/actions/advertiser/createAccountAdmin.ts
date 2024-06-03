"use server";
import prisma from "@/lib/prisma";
import { AdvertiserAccount } from "@prisma/client";

export const createAdvertiserAccount = async ({
  data,
}: {
  data: AdvertiserAccount;
}) => {
  return await prisma.advertiserAccount.create({ data });
};
