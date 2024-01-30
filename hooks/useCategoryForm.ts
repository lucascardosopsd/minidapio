import { CategoryProps } from "@/types/category";
import { categoryValidator } from "@/validators/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const mockCategory = {
  title: "",
};

interface UseCategoryFormProps {
  defaultValues?: CategoryProps | undefined;
}

export const useCategoryForm = ({ defaultValues }: UseCategoryFormProps) => {
  return useForm({
    defaultValues: defaultValues ? defaultValues : mockCategory,
    resolver: zodResolver(categoryValidator),
  });
};
