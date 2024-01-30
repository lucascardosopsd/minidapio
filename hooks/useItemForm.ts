import { ItemProps } from "@/types/item";
import { ItemValidator } from "@/validators/item";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const mockDefault = {
  title: "",
  description: "",
  price: 0,
  image: "",
  highlight: false,
  active: true,
  sale: false,
  salePrice: undefined,
  categoryId: 0,
};

interface UseItemFormHookProps {
  defaultValues?: Partial<ItemProps> | undefined;
}

export const useItemFormHook = ({ defaultValues }: UseItemFormHookProps) => {
  return useForm<ItemProps>({
    resolver: zodResolver(ItemValidator),
    defaultValues: defaultValues ? defaultValues : mockDefault,
  });
};
