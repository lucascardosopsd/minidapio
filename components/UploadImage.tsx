import { toast } from "sonner";
import { UploadDropzone } from "./UploadThing";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Control, useWatch } from "react-hook-form";
import Image from "next/image";

interface UploadImageProps {
  control: Control<any>;
  name: string;
}

const UploadImage = ({ control, name }: UploadImageProps) => {
  const watchLogo = useWatch({
    control,
    name,
  });

  return (
    <div className="relative">
      {watchLogo && (
        <Image
          src={watchLogo}
          alt="logo"
          width={0}
          height={0}
          sizes="1000px"
          className="h-[180px] w-full object-cover absolute bottom-0 -z-10 opacity-50 rounded"
        />
      )}

      <FormField
        control={control}
        name="logo"
        render={({ field: { onChange } }) => (
          <FormItem>
            <FormControl>
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
                }}
                className="border border-primary hover:border-primary/60"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default UploadImage;
