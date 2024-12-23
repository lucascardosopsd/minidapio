import { z } from "zod";

export const variantSchema = z.object({
  title: z.string(),
});
