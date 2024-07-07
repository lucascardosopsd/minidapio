import { z } from "zod";

export const registerValidator = z
  .object({
    name: z.string().max(50, "O nome deve ter no máximo 50 caracteres"),
    email: z
      .string({
        required_error: "Digite o e-mail",
      })
      .email("O e-mail deve ser válido")
      .max(50, "O e-mail deve ter no máximo 50 caracteres"),
    password: z
      .string({
        required_error: "Digite a senha",
      })
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(100, "A senha deve ter no máximo 100 caracteres"),
    confirmPassword: z
      .string({
        required_error: "Confirme a senha",
      })
      .max(100, "A confirmação da senha deve ter no máximo 100 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
