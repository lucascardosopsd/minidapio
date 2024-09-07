"use client";
import useUserProfileForm from "@/hooks/useUserProfileForm";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { UserProfileSchema } from "@/validators/userProfile";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { updateUser } from "@/actions/user/updateUser";
import ProfilePicture from "@/components/misc/ProfilePicture";

interface ProfileFormProps {
  userId: string;
  data: {
    name: string;
    email: string;
    profileImage: string;
  };
}

const ProfileForm = ({ data, userId }: ProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [newImg, setNewImage] = useState("");

  const form = useUserProfileForm({ data });

  const onSubmit = async (data: z.infer<typeof UserProfileSchema>) => {
    setIsLoading(true);

    try {
      await updateUser({
        id: userId,
        data,
      });

      revalidateRoute({ fullPath: "/" });

      toast("Atualizado!");
    } catch (error) {
      toast("Ocorreu um erro!");

      throw new Error("Error when update user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex gap-6 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange } }) => (
            <ProfilePicture
              profileImage={newImg || data.profileImage!}
              onChange={(url) => {
                onChange(url);
                setNewImage(url);
              }}
              onUploading={(isUploading) => {
                setImgUploading(isUploading);
              }}
            />
          )}
        />

        <div className="space-y-4 w-full">
          <FormField
            disabled={isLoading}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Input type="email" disabled value={data.email} />

          <Button
            type="submit"
            className="self-start min-w-[150px]"
            disabled={isLoading || imgUploading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Salvar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
