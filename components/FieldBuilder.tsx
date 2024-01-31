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
}

const FieldBuilder = ({
  title,
  name,
  fieldElement,
  control,
  fieldClassName,
}: FieldBuilderProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            {cloneElement(fieldElement, {
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
