import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfileSchema } from "@/validators/userProfile";

interface UseUserProfileFormProps {
  data?: {
    name: string;
    email: string;
  };
}

const useUserProfileForm = ({ data }: UseUserProfileFormProps) => {
  return useForm<z.infer<typeof UserProfileSchema>>({
    mode: "onChange",
    resolver: zodResolver(UserProfileSchema),
    defaultValues: data || {},
  });
};

export default useUserProfileForm;
