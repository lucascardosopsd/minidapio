"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { planValidator } from "@/validators/plan";

interface UpdatePlanProps {
  id: string;
  data: Partial<z.infer<typeof planValidator>>;
}

export const updatePlan = async ({ data, id }: UpdatePlanProps) => {
  try {
    await prisma.plan.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    throw new Error("Can't update plan");
  }
};
