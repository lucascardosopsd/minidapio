import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Control, useWatch } from "react-hook-form";

interface ColorPickerProps {
  control: Control<any>;
  fieldName: string;
}

const ColorPicker = ({ control, fieldName }: ColorPickerProps) => {
  const watchColor = useWatch({ control, name: "color" });

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
                className="h-10 w-full disabled:opacity-50 disabled:pointer-events-none border-4 rounded"
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
