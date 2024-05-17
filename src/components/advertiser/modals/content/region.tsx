"use client";

import FieldBuilder from "@/components/builders/FieldBuilder";
import SelectBuilder from "@/components/builders/SelectBuilder";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectItem } from "@/components/ui/select";
import { brazilianStates } from "@/constants/brazilianStates";
import { useRegionForm } from "@/hooks/useRegionForm";
import { regionValidator } from "@/validators/region";
import { z } from "zod";

interface RegionModalContentProps {
  defaultValues?: z.infer<typeof regionValidator> | undefined;
}

const RegionModalContent = ({ defaultValues }: RegionModalContentProps) => {
  const form = useRegionForm({ defaultValues });

  return (
    <Form {...form}>
      <form className="space-y-5 h-full">
        <FieldBuilder
          title="Nome"
          control={form.control}
          fieldElement={<Input />}
          name="title"
        />

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
      </form>
    </Form>
  );
};

export default RegionModalContent;
