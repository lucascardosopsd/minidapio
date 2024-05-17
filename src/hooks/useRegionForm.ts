import { regionValidator } from "@/validators/region";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UseRegionFormProps {
  defaultValues?: z.infer<typeof regionValidator> | undefined;
}

export const useRegionForm = ({ defaultValues }: UseRegionFormProps) => {
  return useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(regionValidator),
  });
};
