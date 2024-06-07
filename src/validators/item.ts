import { z } from "zod";

export const ItemValidator = z.object({
  title: z.string({ required_error: "Digite o nome do item" }),
  description: z.string().nullable().optional(),
  price: z.number().nullable().optional().default(0),
  image: z.string({ required_error: "Adicione uma imagem" }),
  active: z.boolean().default(true),
  highlight: z.boolean().default(false),
  sale: z.boolean().default(false),
  salePrice: z.number().nullable().optional(),
  categoryId: z.string().nullable(),
  restaurantId: z.string().nullable().optional(),
  order: z.number().nullable().default(0),
});
