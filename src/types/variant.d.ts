import { variantSchema } from "@/validators/variant";
import { variantItemSchema } from "@/validators/variantItem";
import { z } from "zod";

export type VariantProps = z.infer<typeof variantSchema>;

export type VariantItemProps = z.infer<typeof variantItemSchema>;
