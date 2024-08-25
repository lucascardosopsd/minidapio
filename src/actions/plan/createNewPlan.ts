"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { planValidator } from "@/validators/plan";

interface CreatePlanProps {
  data: z.infer<typeof planValidator>;
}

export const createNewPlan = async ({ data }: CreatePlanProps) => {
  try {
    await prisma.plan.create({
      data: {
        ...data,
      },
    });
  } catch (error) {
    throw new Error("Can't create new plan");
  }
};
