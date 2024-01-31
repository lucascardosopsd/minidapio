import { ReactElement, cloneElement } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Control } from "react-hook-form";

interface FieldBuilderProps {
  title?: string;
  name: string;
  fieldElement: ReactElement;
  control: Control<any>;
  fieldClassName?: string;
  type?: "default" | "checkbox";
  defaultValue?: string | number | boolean;
}

const FieldBuilder = ({
  title,
  name,
  fieldElement,
  control,
  fieldClassName,
  type = "default",
  defaultValue,
}: FieldBuilderProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{title}</FormLabel>
          <FormControl>
            {type == "checkbox"
              ? cloneElement(fieldElement, {
                  ...field,
                  className: fieldClassName,
                  checked: field.value,
                  onCheckedChange: field.onChange,
                  defaultChecked: defaultValue,
                })
              : cloneElement(fieldElement, {
                  ...field,
                  className: fieldClassName,
                })}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FieldBuilder;
