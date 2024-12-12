"use server";
import prisma from "@/lib/prisma";

type createNewVariantProps = {
  data: {
    title: string;
  };
};

export const createNewVariant = async ({ data }: createNewVariantProps) => {
  try {
    return await prisma.variant.create({ data });
  } catch (error) {
    throw new Error("Error when create variant");
  }
};
