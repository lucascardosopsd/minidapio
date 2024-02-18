import { ReactNode } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Control, UseFormSetValue } from "react-hook-form";

interface SelectBuilderProps {
  name: string;
  title: string;
  defaultValue?: string;
  placeholder?: string;
  selectItem: ReactNode | ReactNode[];
  control: Control<any>;
  setValue?: UseFormSetValue<any>;
}

const SelectBuilder = ({
  name,
  title,
  defaultValue,
  placeholder,
  selectItem,
  control,
  setValue,
}: SelectBuilderProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        if (!field.value && defaultValue && setValue) {
          field.value = defaultValue;
          setValue(name, defaultValue);
        }

        return (
          <FormItem>
            <FormLabel>{title}</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        );
      }}
    />
  );
};

export default SelectBuilder;
