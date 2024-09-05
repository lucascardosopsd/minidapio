import { z } from "zod";

export const categoryValidator = z.object({
  title: z.string({ required_error: "Campo Obrigatório" }),
  order: z.number().nullable().default(0),
  active: z.boolean().default(true).optional(),
  restaurantId: z.string().nullable().optional(),
});
