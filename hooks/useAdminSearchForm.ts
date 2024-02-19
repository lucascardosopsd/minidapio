import { searchValidation } from "@/validators/adminSearch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useAdminSearchForm = () => {
  return useForm({
    defaultValues: {
      term: "",
      filter: "",
    },
    resolver: zodResolver(searchValidation),
  });
};
