import { z } from "zod";

export const userValidatorSchema = z.object({
  name: z.string().nullable(),
  email: z.string().nullable(),
  image: z.string().nullable(),
  role: z.string(),
});
