import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { weekDays } from "@/constants/weekDays";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useRestaurantForm } from "@/hooks/useRestaurantForm";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useFieldArray } from "react-hook-form";
import { ChangeEvent, useRef, useState } from "react";
import { z } from "zod";
import { restaurantValidator } from "@/validators/restaurant";
import { RestaurantProps } from "@/types/restaurant";
import { paymentMethods } from "@/constants/paymentMethods";
import FieldBuilder from "../FieldBuilder";
import UploadImage from "../UploadImage";

interface RestaurantFormProps {
  defaultValues?: Omit<RestaurantProps, "id"> | undefined;
  toggleOpen?: () => void;
}

const RestaurantForm = ({
  defaultValues = undefined,
  toggleOpen = () => {},
}: RestaurantFormProps) => {
  const form = useRestaurantForm({ defaultValues });
  const openRef = useRef(null);

  const [logoFile, setLogoFile] = useState<string>("");

  const handleLogoFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(URL.createObjectURL(file));
    }
  };

  const {
    fields: workHoursFields,
    append: appendWorkHour,
    remove: removeWorkHour,
  } = useFieldArray({
    name: "workHours",
    control: form.control,
  });

  const handleAppendWorkHour = () => {
    appendWorkHour({
      weekDay: true,
      opened: true,
      close: true,
      open: true,
    });
  };

  const handleNewRestaurant = (data: z.infer<typeof restaurantValidator>) => {
    // Image upload logic
    form.setValue("logo", "/"); //URL after upload
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleNewRestaurant)}
        className="space-y-4 pb-10 relative max-w-[500px] w-full"
      >
        {/* Basic */}

        <FieldBuilder
          control={form.control}
          fieldElement={<Input />}
          name="title"
          title="Nome*"
        />

        <FieldBuilder
          control={form.control}
          fieldElement={<Input />}
          name="phone1"
          title="Telefone1*"
        />

        <FieldBuilder
          control={form.control}
          fieldElement={<Input />}
          name="phone2"
          title="Telefone 2*"
        />

        <FieldBuilder
          control={form.control}
          fieldElement={<Input />}
          name="address"
          title="Endereço*"
        />

        <FieldBuilder
          control={form.control}
          fieldElement={<Input />}
          name="linkMaps"
          title="Link do Google Maps (Presencial)"
        />

        <FieldBuilder
          control={form.control}
          fieldElement={
            <Input
              id="hs-color-input"
              value="#ffaa00"
              type="color"
              className="hidden"
            />
          }
          name="color"
          title="Cor Principal*"
        />

        <UploadImage
          activeTitle="Substituir imagem"
          defaultTitle="Clique para subir a Imagem"
          onChange={handleLogoFile}
          imageFile={logoFile}
          logoUrl={defaultValues?.logo}
        />

        {/* Methods */}
        <div className="border border-border p-2 rounded space-y-4 flex flex-col">
          <p>Métodos de Pagamento*</p>

          <div className="grid grid-cols-3 gap-2">
            {paymentMethods.map((title, index) => (
              <div className="flex items-center gap-2 p-2 border border-primary rounded">
                <FieldBuilder
                  key={index}
                  control={form.control}
                  fieldElement={<Checkbox />}
                  name={`methods.${index}`}
                />
                <p>{title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div className="border border-border p-2 rounded space-y-4 flex flex-col">
          <p>Horários*</p>

          {workHoursFields.map((_, index) => (
            <span key={index}>
              <div className="flex flex-col gap-2 border border-primary rounded p-2">
                <FormField
                  control={form.control}
                  name={`workHours.${index}.weekDay`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dia</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={
                            !field.value
                              ? defaultValues?.workHours &&
                                defaultValues?.workHours[
                                  index
                                ]?.weekDay.toString()
                              : field.value.toString()
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o dia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {weekDays.map((day) => (
                                <SelectItem value={day.value} key={day.id}>
                                  {day.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`workHours.${index}.times.open`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Inicio</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} ref={openRef} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`workHours.${index}.times.close`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Fim</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`workHours.${index}.opened`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            defaultChecked
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p>Aberto</p>
                </div>

                <Button
                  variant="destructive"
                  onClick={() => removeWorkHour(index)}
                  type="button"
                >
                  Remover
                </Button>
              </div>
            </span>
          ))}

          <Button type="button" onClick={handleAppendWorkHour}>
            Adicionar
          </Button>
        </div>

        {/* Others */}

        <div className="flex items-center gap-2">
          <FieldBuilder
            control={form.control}
            fieldElement={<Input defaultChecked={true} />}
            name="activeMenu"
          />

          <p>Cardápio ativo?</p>
        </div>

        <FieldBuilder
          control={form.control}
          fieldElement={
            <Textarea placeholder="Deseja deixar uma observação para o cliente no cardápio?" />
          }
          name="note"
          title="Observação"
        />

        <div className="flex gap-2 items-center">
          <Button
            variant="destructive"
            className="w-full"
            type="button"
            onClick={toggleOpen}
          >
            Cancelar
          </Button>

          <Button variant="default" className="w-full" type="submit">
            {defaultValues ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RestaurantForm;
