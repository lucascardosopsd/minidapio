import { ItemValidator } from '@/validators/item';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const mockDefault = {
  highlight: false,
  active: true,
  sale: false,
};

interface UseItemFormHookProps {
  defaultValues: Partial<z.infer<typeof ItemValidator>>;
}

export const useItemFormHook = ({ defaultValues }: UseItemFormHookProps) => {
  return useForm<z.infer<typeof ItemValidator>>({
    resolver: zodResolver(ItemValidator),
    defaultValues: defaultValues ? defaultValues : mockDefault,
  });
};
