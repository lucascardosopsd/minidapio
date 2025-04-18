"use server";

import prisma from "@/lib/prisma";
import { Plan } from "@/types/plan";

export const fetchPlanById = async (id: string): Promise<Plan | null> => {
  try {
    const plan = await prisma.plan.findUnique({
      where: {
        id,
      },
    });

    if (!plan) return null;

    return {
      id: plan.id,
      name: plan.title,
      price: plan.price,
      alias: plan.alias,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching plan:", error);
    return null;
  }
}; 