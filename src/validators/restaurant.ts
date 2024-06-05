import { z } from "zod";

const hoursSchema = z.object({
  open: z.string().nullable().optional(),
  close: z.string().nullable().optional(),
});

const workHoursSchema = z.object({
  weekDay: z.string({
    required_error: "Dia Obrigatório",
    invalid_type_error: "Dia obrigatório",
  }),
  opened: z.boolean().default(true).nullable(),
  times: hoursSchema,
});

const PaymentMethodSchema = z.object({
  pix: z.boolean().optional(),
  cash: z.boolean().optional(),
  credit: z.boolean().optional(),
  debit: z.boolean().optional(),
  bankCheck: z.boolean().optional(),
});

export const restaurantValidator = z.object({
  id: z.string().optional(),
  title: z.string().min(2, { message: "Campo Obrigatório" }),
  active: z.boolean().default(true),
  whatsapp: z.string().nullable().optional(),
  landline: z.string().nullable().optional(),
  address: z
    .string({ required_error: "Campo Obrigatório" })
    .min(4, { message: "Campo Obrigatório" }),
  workHours: z.array(workHoursSchema).nullable(),
  logo: z.string().min(1, { message: "Campo Obrigatório" }),
  color: z.string({ required_error: "Campo Obrigatório" }),
  linkMaps: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
  activeMenu: z.boolean().default(true),
  methods: PaymentMethodSchema,
  slug: z.string().optional(),
  regionId: z.string({ required_error: "Escolha uma região" }).nullable(),
});
