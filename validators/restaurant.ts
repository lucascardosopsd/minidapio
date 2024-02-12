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

const PaymentMethodSchema = z.object({
  pix: z.boolean(),
  cash: z.boolean(),
  credit: z.boolean(),
  debit: z.boolean(),
  bankCheck: z.boolean(),
});

export const restaurantValidator = z.object({
  title: z.string().min(2, { message: "Campo Obrigatório" }),
  active: z.boolean().default(true),
  whatsapp: z.string().optional(),
  landline: z.string().optional(),
  address: z
    .string({ required_error: "Campo Obrigatório" })
    .min(4, { message: "Campo Obrigatório" }),
  workHours: z.array(workHoursSchema).optional(),
  logo: z.string().min(1, { message: "Campo Obrigatório" }),
  color: z.string({ required_error: "Campo Obrigatório" }),
  linkMaps: z.string().optional(),
  note: z.string().optional(),
  activeMenu: z.boolean().default(true),
  methods: PaymentMethodSchema,
  slug: z.string(),
});
