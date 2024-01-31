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
  type?: "default" | "checkbox" | "select";
}

const FieldBuilder = ({
  title,
  name,
  fieldElement,
  control,
  fieldClassName,
  type = "default",
}: FieldBuilderProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            {type == "checkbox"
              ? cloneElement(fieldElement, {
                  ...field,
                  className: fieldClassName,
                  checked: field.value,
                  onCheckedChange: field.onChange,
                })
              : type == "select"
              ? cloneElement(fieldElement, {
                  ...field,
                  onValueChange: field.onChange,
                  defaultValue: field.value,
                  className: fieldClassName,
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
