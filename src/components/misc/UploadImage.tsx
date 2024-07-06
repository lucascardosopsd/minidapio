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
              <div className="relative">
                {watchChange && (
                  <Image
                    src={watchChange}
                    alt={name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover absolute bottom-0 -z-10 opacity-50 rounded-lg"
                  />
                )}
                <UploadDropzone
                  content={{
                    label: "Enviar arquivo",
                    allowedContent: "Imagem de até 1MB",
                    button: "Confirmar",
                  }}
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => onChange(res[0].url)}
                  onUploadError={(error: Error) =>
                    toast("Erro ao enviar a logo.")
                  }
                  appearance={{
                    label: "text-primary hover:text-primary/60 transition",
                    button: "bg-primary text-background",
                    allowedContent: "text-primary/60",
                    uploadIcon: "text-primary",
                    container: "w-full h-full -mt-2",
                  }}
                  className="border border-primary hover:border-primary/60"
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
