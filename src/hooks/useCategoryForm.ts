import { categoryValidator } from "@/validators/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useForm } from "react-hook-form";

interface UseCategoryFormProps {
  defaultValues?: Partial<Category> | undefined;
}

export const useCategoryForm = ({ defaultValues }: UseCategoryFormProps) => {
  return useForm<Category>({
    defaultValues,
    resolver: zodResolver(categoryValidator),
  });
};
