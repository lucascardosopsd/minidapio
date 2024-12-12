"use server";

import prisma from "@/lib/prisma";
import { VariantItemProps } from "@/types/variant";

type CreateManyVariantItems = {
  data: VariantItemProps[];
};

export const createManyVariantItems = async ({
  data,
}: CreateManyVariantItems) => {
  try {
    await prisma.variantItem.createMany({ data });
  } catch (error) {
    throw new Error("Error when create many variant items");
  }
};
