import { variantItemSchema } from "@/validators/variantItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UseVariantItemFormProps = {
  defaultValues?: z.infer<typeof variantItemSchema>;
};

export const useVariantItemForm = ({
  defaultValues,
}: UseVariantItemFormProps) => {
  return useForm({
    resolver: zodResolver(variantItemSchema),
    defaultValues,
  });
};
