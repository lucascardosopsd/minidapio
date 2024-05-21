import { UserProps } from "@/types/user";
import { userValidatorSchema } from "@/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface useUserFormProps {
  defaultValues?: UserProps;
}

export const useUserForm = ({ defaultValues }: useUserFormProps) => {
  return useForm({
    defaultValues,
    resolver: zodResolver(userValidatorSchema),
  });
};
