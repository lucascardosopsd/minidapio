import { z } from "zod";

export const ItemValidator = z
  .object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    image: z.string(),
    highlight: z.boolean(),
    active: z.boolean(),
    sale: z.boolean(),
    salePrice: z.number().optional(),
    categoryId: z.number().optional(),
    restaurantId: z.number().optional(),
  })
  .refine(
    (data) =>
      data?.sale &&
      !data.price && {
        message: "Preço da promoção obrigatório",
      }
  );
