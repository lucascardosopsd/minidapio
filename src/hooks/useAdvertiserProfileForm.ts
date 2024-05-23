import { advertiserProfile } from "@/validators/advertiserProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UseAdvertiserProfileProps {
  defaultValues?: z.infer<typeof advertiserProfile>;
}

export const useAdvertiserProfileForm = ({
  defaultValues,
}: UseAdvertiserProfileProps) => {
  return useForm({
    defaultValues,
    resolver: zodResolver(advertiserProfile),
  });
};
