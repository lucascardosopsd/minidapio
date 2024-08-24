import { z } from "zod";

export const checkoutValidator = z.object({
  holderName: z.string({ required_error: "Digite seu nome" }).max(100),
  number: z.string({ required_error: "Preencha o número" }).max(16),
  expiryMonth: z
    .string({ required_error: "Preencha o mês de expiração" })
    .max(5),
  expiryYear: z
    .string({ required_error: "Preencha o ano de expiração" })
    .max(5),
  ccv: z.string({ required_error: "Preencha o código de segurança" }).max(4),
});
