import { z } from "zod";

export const advertiserProfile = z.object({
  name: z.string({ required_error: "Complete seu nome" }),
  cpfCnpj: z.string({ required_error: "Informe o número do documento" }),
  phone: z.string({ required_error: "Informe o número de telefone" }),
  personType: z.string(),
  userId: z.string(),
  customerId: z.string(),
  afiliateCode: z.number().nullable().optional(),
});
