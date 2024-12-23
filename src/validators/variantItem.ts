import { z } from "zod";

export const variantItemSchema = z.object({
  title: z.string(),
  price: z.number(),
  active: z.boolean(),
  description: z.string(),
  order: z.number(),
  min: z.number(),
  max: z.number(),
  variantId: z.string(),
});
