import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
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
                className="h-10 w-full disabled:opacity-50 disabled:pointer-events-none border-4 rounded hidden"
                id="hs-color-input"
                {...field}
              />

              <label
                htmlFor="hs-color-input"
                className="w-full h-10 rounded flex items-center justify-center"
                style={{
                  borderColor: watchColor,
                  background: watchColor,
                }}
              >
                Selecione a cor
              </label>
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
