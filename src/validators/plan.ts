import { z } from "zod";

export const planValidator = z.object({
  title: z.string({ required_error: "Digite o " }),
  alias: z.string({ required_error: "Digite o apelido" }),
  subTitle: z.string({ required_error: "Digite o sub título" }).nullable(),
  level: z.number({ required_error: "Digite o nível" }),
  price: z.number({ required_error: "Digite o preço" }),
  description: z.string(),
});
