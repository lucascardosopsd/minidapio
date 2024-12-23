import { variantSchema } from "@/validators/variant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UseVariantFormProps = {
  defaultValues?: z.infer<typeof variantSchema>;
};

export const useVariantForm = ({ defaultValues }: UseVariantFormProps) => {
  return useForm({
    resolver: zodResolver(variantSchema),
    defaultValues,
  });
};
