import { z } from "zod";

export const loginValidator = z.object({
  email: z
    .string({
      required_error: "Digite o e-mail",
    })
    .max(100),
  password: z
    .string({
      required_error: "Digite a senha",
    })
    .max(100),
});
