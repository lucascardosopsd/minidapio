import { z } from "zod";

export const adValidator = z.object({
  title: z.string({ required_error: "Digite um título" }),
  description: z.string({ required_error: "Digite uma descrição" }),
  image: z.string({ required_error: "Suba uma imagem" }),
  link: z.string().optional().nullable(),
  userId: z
    .string({
      required_error: "Atribua um usuário",
      invalid_type_error: "",
    })
    .nullable(),
  regionId: z.string(),
  active: z.boolean().default(true),
  expiration: z.date().optional().nullable(),
  advertiserAccountId: z.string().nullable(),
});
