import { afiliateValidator } from "@/validators/afiliate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UseAfiliateFormProps {
  defaultValues?: z.infer<typeof afiliateValidator> | undefined;
}

export const useAfiliateForm = ({ defaultValues }: UseAfiliateFormProps) => {
  return useForm({
    resolver: zodResolver(afiliateValidator),
    defaultValues,
  });
};
