import { z } from "zod";

export const ItemValidator = z.object({
  title: z.string({ required_error: "Digite o nome do item" }),
  description: z.string().nullable(),
  price: z.number({ required_error: "Estabeleça um preço" }),
  image: z.string({ required_error: "Adicione uma imagem" }),
  active: z.boolean().default(true),
  highlight: z.boolean().default(false),
  sale: z.boolean().default(false),
  salePrice: z.number().nullable().optional(),
  categoryId: z.string().nullable(),
  restaurantId: z.string().nullable().optional(),
});
