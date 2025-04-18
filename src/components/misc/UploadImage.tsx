import { toast } from 'sonner';
import { UploadDropzone } from './UploadThing';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Control, useWatch } from 'react-hook-form';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
    <div className="overflow-hidden rounded">
      <FormField
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <FormItem>
            <FormLabel>Upload da imagem</FormLabel>
            <FormControl>
              <div className="group relative">
                {watchChange && (
                  <Image
                    src={watchChange}
                    alt={name}
                    width={500}
                    height={500}
                    className="absolute bottom-0 -z-10 h-full w-full rounded-lg object-cover group-hover:opacity-50"
                  />
                )}
                <UploadDropzone
                  content={{
                    label: 'Enviar arquivo',
                    allowedContent: 'Imagem de até 1MB',
                    button: '',
                  }}
                  endpoint="imageUploader"
                  onClientUploadComplete={res => onChange(res[0]?.ufsUrl)}
                  // @ts-ignore
                  onUploadError={_ => toast('Erro ao enviar a logo.')}
                  appearance={{
                    label: 'text-primary hover:text-primary/60 transition',
                    allowedContent: 'text-primary/60',
                    uploadIcon: 'text-primary',
                    container: 'w-full h-full -mt-2',
                  }}
                  className={cn(
                    'border border-primary hover:border-primary/60 ut-button:bg-primary ut-button:text-white ut-button:after:bg-primary'
                  )}
                  config={{
                    mode: 'auto',
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
