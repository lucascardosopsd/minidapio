import { z } from "zod";

export const customerProfileValidator = z.object({
  name: z.string({ required_error: "Preencha o nome" }),
  email: z
    .string({ required_error: "Preencha o email" })
    .email({ message: "Formato inválido" }),
  cpfCnpj: z.string({ required_error: "Preencha o CPF/CNPJ" }),
  postalCode: z.string({ required_error: "Preencha o CEP" }),
  addressNumber: z.string({ required_error: "Preencha o número da casa" }),
  mobilePhone: z.string({ required_error: "Preencha o telefone" }),
  personType: z.string(),
  address: z.string(),
  addressComplement: z.string().nullable(),
  city: z.string(),
  state: z.string(),
});
