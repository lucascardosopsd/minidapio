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
import { Control } from "react-hook-form";

interface SelectBuilderProps {
  name: string;
  title?: string;
  placeholder?: string | ReactNode;
  selectItem: ReactNode | ReactNode[];
  control: Control<any>;
  triggerClassName?: string;
}

const SelectBuilder = ({
  name,
  title,
  placeholder,
  selectItem,
  control,
  triggerClassName,
}: SelectBuilderProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {title && <FormLabel>{title}</FormLabel>}
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className={triggerClassName || ""}>
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
