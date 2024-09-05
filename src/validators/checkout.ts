import { z } from "zod";

export const checkoutValidator = z.object({
  holderName: z
    .string({ required_error: "Digite seu nome" })
    .max(100)
    .min(1, "Digite seu nome"),
  number: z
    .string({ required_error: "Preencha o número" })
    .max(16)
    .min(16, "Preencha o número"),
  expiry: z
    .string({ required_error: "Preencha o mês de expiração" })
    .max(5)
    .min(1, "Preencha o mês de expiração"),
  expiryMonth: z.string().optional(),
  expiryYear: z.string().optional(),
  ccv: z
    .string({ required_error: "Preencha o código de segurança" })
    .max(4)
    .min(3, "Preencha o código de segurança"),
});
