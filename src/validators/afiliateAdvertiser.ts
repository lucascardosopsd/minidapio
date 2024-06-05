import { z } from "zod";

export const afiliateAdvertiserValidator = z.object({
  afiliateId: z.string(),
  advertiserAccountId: z.string(),
});
