import { userValidatorSchema } from "@/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";

interface useUserFormProps {
  defaultValues?: User | undefined;
}

export const useUserForm = ({ defaultValues }: useUserFormProps) => {
  return useForm({
    defaultValues,
    resolver: zodResolver(userValidatorSchema),
  });
};
