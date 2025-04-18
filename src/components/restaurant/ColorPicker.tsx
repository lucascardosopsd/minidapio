import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Control } from 'react-hook-form';

interface ColorPickerProps {
  control: Control<any>;
  fieldName: string;
}

const ColorPicker = ({ control, fieldName }: ColorPickerProps) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <>
              <input
                type="color"
                className="h-10 w-full rounded border-4 disabled:pointer-events-none disabled:opacity-50"
                id="hs-color-input"
                {...field}
              />
            </>
          </FormControl>
          <p className="text-xs">Clique para mudar</p>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ColorPicker;
