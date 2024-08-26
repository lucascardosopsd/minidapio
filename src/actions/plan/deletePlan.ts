"use server";
import prisma from "@/lib/prisma";

export const deletePlan = async ({ id }: { id: string }) => {
  try {
    await prisma.plan.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error("Can't delete plan");
  }
};
