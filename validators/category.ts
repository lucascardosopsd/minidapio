import { z } from "zod";

export const categoryValidator = z.object({
  title: z.string({ required_error: "Campo Obrigatório" }),
  restaurantId: z.string().nullable().optional(),
});
