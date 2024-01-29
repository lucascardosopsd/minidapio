import { z } from "zod";

const hoursSchema = z.object({
  open: z.string({ required_error: "Hora da abertura obrigatória" }),
  close: z.string({ required_error: "Hora do fechamento obrigatória" }),
});

const workHoursSchema = z.object({
  weekDay: z.string({ required_error: "Dia Obrigatório" }),
  opened: z.boolean().default(true),
  times: hoursSchema,
});

export const restaurantValidator = z.object({
  title: z.string().min(2, { message: "Campo Obrigatório" }),
  active: z.boolean().default(true),
  phone1: z.string().min(11, { message: "Campo Obrigatório" }),
  phone2: z.string().optional(),
  address: z
    .string({ required_error: "Campo Obrigatório" })
    .min(4, { message: "Campo Obrigatório" }),
  workHours: z.array(workHoursSchema).min(1),
  logo: z.string().min(1, { message: "Campo Obrigatório" }),
  color: z.string({ required_error: "Campo Obrigatório" }),
  linkMaps: z.string().optional(),
  note: z.string().optional(),
  activeMenu: z.boolean().default(true),
});
