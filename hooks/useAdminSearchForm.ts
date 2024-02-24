import { searchValidation } from "@/validators/adminSearch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useAdminSearchForm = () => {
  return useForm({
    defaultValues: {
      filter: {
        title: undefined,
        description: undefined,
        price: undefined,
        active: "true",
        categoryId: undefined,
        page: "1"
      },
    },
    resolver: zodResolver(searchValidation),
  });
};
