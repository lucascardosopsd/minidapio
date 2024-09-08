import { toast } from "sonner";
import { UploadDropzone } from "./UploadThing";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Control, useWatch } from "react-hook-form";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface UploadImageProps {
  control: Control<any>;
  name: string;
}

const UploadImage = ({ control, name }: UploadImageProps) => {
  const watchChange = useWatch({
    control,
    name,
  });

  return (
    <div className="rounded overflow-hidden">
      <FormField
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <FormItem>
            <FormLabel>Upload da imagem</FormLabel>
            <FormControl>
              <div className="relative group">
                {watchChange && (
                  <Image
                    src={watchChange}
                    alt={name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover absolute group-hover:opacity-50 bottom-0 -z-10 rounded-lg"
                  />
                )}
                <UploadDropzone
                  content={{
                    label: "Enviar arquivo",
                    allowedContent: "Imagem de até 1MB",
                    button: "",
                  }}
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => onChange(res[0].url)}
                  onUploadError={(error: Error) =>
                    toast("Erro ao enviar a logo.")
                  }
                  appearance={{
                    label: "text-primary hover:text-primary/60 transition",
                    allowedContent: "text-primary/60",
                    uploadIcon: "text-primary",
                    container: "w-full h-full -mt-2",
                  }}
                  className={cn(
                    "border border-primary hover:border-primary/60 ut-button:bg-primary ut-button:text-white ut-button:after:bg-primary",
                    watchChange && "opacity-0 hover:opacity-100 transition"
                  )}
                  config={{
                    mode: "auto",
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default UploadImage;
