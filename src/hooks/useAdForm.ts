import { adValidator } from "@/validators/ad";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UseAdFormProps {
  defaultValues?: z.infer<typeof adValidator>;
}

export const useAdForm = ({ defaultValues }: UseAdFormProps) => {
  return useForm({
    defaultValues,
    resolver: zodResolver(adValidator),
  });
};
