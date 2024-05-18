"use client";

import FieldBuilder from "@/components/builders/FieldBuilder";
import SelectBuilder from "@/components/builders/SelectBuilder";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { brazilianStates } from "@/constants/brazilianStates";
import { useRegionForm } from "@/hooks/useRegionForm";
import { regionValidator } from "@/validators/region";
import { z } from "zod";

interface RegionModalContentProps {
  defaultValues?: z.infer<typeof regionValidator> | undefined;
  onSubmit: (data: z.infer<typeof regionValidator>) => Promise<void>;
}

const RegionModalContent = ({
  defaultValues,
  onSubmit,
}: RegionModalContentProps) => {
  const form = useRegionForm({ defaultValues });

  return (
    <Form {...form}>
      <form className="space-y-5 h-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <FieldBuilder
            title="Nome"
            control={form.control}
            fieldElement={<Input />}
            name="title"
          />

          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="w-full text-center">Ativo</FormLabel>
                <FormControl>
                  <div className="flex items-center h-full">
                    <Switch
                      onCheckedChange={field.onChange}
                      checked={field.value}
                      className="h-8 w-14 mt-2"
                      thumbClassName="data-[state=checked]:translate-x-8"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <SelectBuilder
          title="Estado"
          control={form.control}
          setValue={form.setValue}
          name="state"
          selectItem={
            <div className="h-[300px]">
              {brazilianStates.map((state) => (
                <SelectItem value={state.value} key={state.label}>
                  {state.label}
                </SelectItem>
              ))}
            </div>
          }
        />

        <Button type="submit">Confirmar</Button>
      </form>
    </Form>
  );
};

export default RegionModalContent;
