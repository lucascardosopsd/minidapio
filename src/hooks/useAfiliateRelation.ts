import { afiliateAdvertiserValidator } from "@/validators/afiliateAdvertiser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UseAfiliateRelationProps {
  defaultValues?: z.infer<typeof afiliateAdvertiserValidator>;
}

export const useAfiliateRelationForm = ({
  defaultValues,
}: UseAfiliateRelationProps) => {
  return useForm({
    defaultValues,
    resolver: zodResolver(afiliateAdvertiserValidator),
  });
};
