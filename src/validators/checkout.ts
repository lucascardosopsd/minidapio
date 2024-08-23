import { z } from "zod";

export const checkoutValidator = z.object({
  name: z.string({ required_error: "Digite seu nome" }).max(100),
  number: z.string({ required_error: "Preencha o número" }).max(16),
  expiry: z.string({ required_error: "Preencha a Data de expiração" }).max(5),
  cvv: z.string({ required_error: "Preencha o código de segurança" }).max(4),
});
