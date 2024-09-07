import { z } from "zod";

export const UserProfileSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "required").optional(),
  image: z.string().optional(),
});
