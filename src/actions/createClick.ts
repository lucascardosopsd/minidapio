"use server";

import prisma from "@/lib/prisma";

interface CreateClickProps {
  adId: string;
}

export const createClick = async ({ adId }: CreateClickProps) => {
  return await prisma.click.create({
    data: { adId },
  });
};
