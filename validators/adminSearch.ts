import { z } from "zod";

export const searchValidation = z.object({
  filter: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    active: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});
