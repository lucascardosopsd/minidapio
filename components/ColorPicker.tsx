import { ChangeEvent, useState } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Control } from "react-hook-form";

interface ColorPcikerProps {
  control: Control<any>;
  fieldName: string;
}

const ColorPciker = ({ control, fieldName }: ColorPcikerProps) => {
  const [color, setColor] = useState("#ffaa00");

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <input
              type="color"
              style={{
                borderColor: color,
                background: color,
              }}
              className={`h-10 w-full block disabled:opacity-50 disabled:pointer-events-none border-4 rounded`}
              id="hs-color-input"
              value={color}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setColor(e.target.value);
                field.onChange(color);
              }}
            />
          </FormControl>
          <p className="text-xs">Clique para mudar</p>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ColorPciker;
