import { paymentProfile } from "@/validators/paymentProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UsePaymentProfileProps {
  defaultValues?: z.infer<typeof paymentProfile>;
}

export const usePaymentProfileForm = ({
  defaultValues,
}: UsePaymentProfileProps) => {
  return useForm({
    defaultValues,
    resolver: zodResolver(paymentProfile),
  });
};
