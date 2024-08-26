"use server";
import prisma from "@/lib/prisma";
import { Plan, Prisma } from "@prisma/client";

interface FetchPlansByQueryResProps {
  plans: Plan[];
  pages: number;
}

interface FetchPlansByQueryProps {
  take: number;
  page: number;
  query?: Prisma.PlanFindManyArgs;
}

export const fetchPlansByQuery = async <T = FetchPlansByQueryResProps>({
  page,
  take,
  query = {},
}: FetchPlansByQueryProps): Promise<T> => {
  const count = await prisma.user.count();
  const pages = Math.ceil(count / take);

  const skip = page * take;

  const plans = await prisma.plan.findMany({
    skip,
    take,
    ...query,
  });

  return {
    plans,
    pages,
  } as T;
};
