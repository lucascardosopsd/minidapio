import { adminAdvertiserProfile } from "@/validators/adminAdvertiserProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UseAdminAdvertiserProfileFormProps {
  defaultValues?: z.infer<typeof adminAdvertiserProfile>;
}

export const useAdminAdvertiserProfileForm = ({
  defaultValues,
}: UseAdminAdvertiserProfileFormProps) => {
  return useForm({
    defaultValues,
    resolver: zodResolver(adminAdvertiserProfile),
  });
};
