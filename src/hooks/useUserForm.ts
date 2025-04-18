import { useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidatorSchema } from "@/validators/user";
import { z } from "zod";

type UserFormData = z.infer<typeof userValidatorSchema>;

interface UseUserFormProps {
  defaultValues?: User | undefined;
}

export const useUserForm = ({ defaultValues }: UseUserFormProps) => {
  return useForm<UserFormData>({
    resolver: zodResolver(userValidatorSchema),
    defaultValues: defaultValues ? {
      name: defaultValues.name,
      email: defaultValues.email || "",
      profileImage: defaultValues.profileImage,
      role: defaultValues.role,
    } : {
      name: "",
      email: "",
      profileImage: null,
      role: "user",
    },
  });
};
