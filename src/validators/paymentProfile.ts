import { z } from "zod";

export const paymentProfile = z.object({
  name: z.string({ required_error: "Complete seu nome" }),
  email: z.string({ required_error: "Complete seu nome" }),
  cpfCnpj: z.string({ required_error: "Informe o número do documento" }),
  mobilePhone: z.string({ required_error: "Informe o número de telefone" }),
  phone: z.string().optional().default("00000000000"),
  postalCode: z.string(),
});
