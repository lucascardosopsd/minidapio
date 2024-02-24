import { searchValidation } from "@/validators/adminSearch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SearchFilterProps {
  title: string;
  description: string;
  price: number | undefined;
  active: string;
  categoryId: string;
  page: string;
}

interface SearchDefaultValuesProps {
  filter: SearchFilterProps;
}

interface UseAdminSearchFormProps {
  defaultValues?: z.infer<typeof searchValidation>;
}

export const useAdminSearchForm = ({
  defaultValues,
}: UseAdminSearchFormProps) => {
  return useForm<SearchDefaultValuesProps>({
    defaultValues: {
      filter: {
        title: defaultValues?.filter?.title || undefined,
        description: defaultValues?.filter?.description || undefined,
        price: defaultValues?.filter?.price || undefined,
        active: defaultValues?.filter?.active || "true",
        categoryId: defaultValues?.filter?.categoryId || undefined,
        page: "1",
      },
    },
    resolver: zodResolver(searchValidation),
  });
};
