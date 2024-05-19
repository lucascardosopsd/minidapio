import { z } from "zod";

export const regionValidator = z.object({
  title: z.string({ required_error: "Digite o título" }),
  state: z.string({ required_error: "Selecione o código do estado" }),
  active: z.boolean().default(true),
});
