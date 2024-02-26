import { z } from "zod";

export const categoryValidator = z.object({
  title: z.string({ required_error: "Campo Obrigatório" }),
  order: z.number().optional().default(0),
  restaurantId: z.string().nullable().optional(),
});
