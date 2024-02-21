import { CategoryProps } from "@/types/category";
import { categoryValidator } from "@/validators/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UseCategoryFormProps {
  defaultValues?: Partial<CategoryProps> | undefined;
}

export const useCategoryForm = ({ defaultValues }: UseCategoryFormProps) => {
  return useForm<CategoryProps>({
    defaultValues,
    resolver: zodResolver(categoryValidator),
  });
};
