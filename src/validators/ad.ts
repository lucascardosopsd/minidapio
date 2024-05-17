import { z } from "zod";

export const adValidator = z.object({
  title: z.string({ required_error: "Digite um título" }),
  description: z.string({ required_error: "Digite uma descrição" }),
  image: z.string({ required_error: "Suba uma imagem" }),
  link: z.string().optional(),
  region: z.string(),
  expiration: z.date().optional(),
});
