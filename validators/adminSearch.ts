import { z } from "zod";

export const searchValidation = z.object({
  term: z.string(),
  filter: z.string(),
});
