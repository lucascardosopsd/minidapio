import { z } from "zod";

export const afiliateValidator = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  pix: z.string(),
  kickback: z.number().optional().default(70),
  code: z.number(),
  userId: z.string(),
});
