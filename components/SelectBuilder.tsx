import { ReactNode } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Control } from "react-hook-form";

interface SelectBuilderProps {
  name: string;
  title: string;
  defaultValue?: string;
  placeholder?: string;
  selectItem: ReactNode | ReactNode[];
  control: Control<any>;
}

const SelectBuilder = ({
  name,
  title,
  defaultValue,
  placeholder,
  selectItem,
  control,
}: SelectBuilderProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={
                !field.value
                  ? defaultValue && defaultValue
                  : field.value.toString()
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>{selectItem}</SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectBuilder;
