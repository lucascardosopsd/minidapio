"use client";
import { weekDays } from "@/constants/weekDays";
import { useRestaurantForm } from "@/hooks/useRestaurantForm";
import { useFieldArray, useWatch } from "react-hook-form";
import { z } from "zod";
import { restaurantValidator } from "@/validators/restaurant";
import { RestaurantProps } from "@/types/restaurant";
import { paymentMethods } from "@/constants/paymentMethods";
import FieldBuilder from "../../builders/FieldBuilder";
import UploadImage from "../../misc/UploadImage";
import SelectBuilder from "../../builders/SelectBuilder";
import { PatternFormat } from "react-number-format";
import Fence from "../Fence";
import { slugGen } from "@/tools/slugGen";
import ColorPicker from "../ColorPicker";
import { createNewRestaurant } from "@/actions/restaurant/createNewRestaurant";
import { toast } from "sonner";
import { useState } from "react";
import { fetchUserRestaurantsByQuery } from "@/actions/restaurant/fetchUserRestaurantsByQuery";
import { updateRestaurant } from "@/actions/restaurant/updateRestaurant";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RegionProps } from "@/types/region";

interface RestaurantFormProps {
  defaultValues?: RestaurantProps | undefined;
  toggleOpen?: () => void;
  regions: RegionProps[];
  userId?: string;
}

const RestaurantForm = ({
  defaultValues = undefined,
  toggleOpen = () => {},
  regions,
  userId,
}: RestaurantFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useRestaurantForm({ defaultValues });

  const regionsOptions = regions.map((region: RegionProps) => ({
    label: region.title,
    value: region.id,
  }));

  const watchTitle = useWatch({
    control: form.control,
    name: "title",
  });

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

  const handleUpdateRestaurant = async (
    data: z.infer<typeof restaurantValidator>
  ) => {
    setLoading(true);

    const restaurantExists = await fetchUserRestaurantsByQuery({
      where: {
        title: form.getValues("title"),
      },
    });

    if (!restaurantExists[0]) {
      setLoading(false);
      return;
    }

    try {
      await updateRestaurant({ id: defaultValues?.id!, data });
      form.reset();
      toast("Restaurante Atualizado");
    } catch (error) {
      toast("Ocorreu um erro.");
    } finally {
      toggleOpen();
      setLoading(false);
    }
  };

  const handleNewRestaurant = async (
    data: z.infer<typeof restaurantValidator>
  ) => {
    setLoading(true);

    const restaurantExists = await fetchUserRestaurantsByQuery({
      where: {
        title: form.getValues("title"),
      },
    });

    if (restaurantExists[0]) {
      toast("Já existe um restaurante com este nome!");
      setLoading(false);
      return;
    }

    try {
      const slug = slugGen(form.getValues("title"));
      await createNewRestaurant({
        ...data,
        slug,
      });
      form.reset();
      toast("Restaurante Criado");
    } catch (error) {
      toast("Ocorreu um erro.");
    } finally {
      toggleOpen();
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          !defaultValues ? handleNewRestaurant : handleUpdateRestaurant
        )}
        className="space-y-4 pb-10 relative max-w-[500px] w-full"
      >
        {/* Basic */}
        <FieldBuilder
          control={form.control}
          fieldElement={<Input />}
          name="title"
          title="Nome*"
        />

        <Fence className="flex-col !items-start">
          <FieldBuilder
            control={form.control}
            fieldElement={<PatternFormat format="+55(##)#####-####" />}
            name="whatsapp"
            title="Whatsapp"
          />

          <FieldBuilder
            control={form.control}
            fieldElement={<PatternFormat format="+55(##)####-####" />}
            name="landline"
            title="Telefone FIxo"
          />
          <p className="text-xs">Deve haver pelo menos um</p>
        </Fence>

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

        <div className="flex flex-col">
          <p>Cor Principal*</p>
          <ColorPicker control={form.control} fieldName="color" />
        </div>

        <div className="flex flex-col">
          <p>Logo*</p>
          <UploadImage control={form.control} name="logo" />
        </div>

        {/* Methods */}
        <div className="border border-border p-2 rounded space-y-4 flex flex-col">
          <p>Métodos de Pagamento*</p>

          <div className="grid grid-cols-2 gap-2">
            {paymentMethods.map((method, index) => (
              <div
                className="flex items-center gap-2 p-2 border border-primary rounded "
                key={index}
              >
                <div>
                  <FieldBuilder
                    type="checkbox"
                    control={form.control}
                    fieldElement={<Checkbox />}
                    name={`methods.${method.label}`}
                  />
                </div>
                <p className="w-full text-start flex-1">{method.title}</p>
              </div>
            ))}
          </div>
        </div>

        <SelectBuilder
          title="Região"
          control={form.control}
          name="regionId"
          selectItem={regionsOptions.map((option) => (
            <SelectItem value={option.value}>{option.label}</SelectItem>
          ))}
        />

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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={
                          field.value ||
                          defaultValues?.workHours[index]?.weekDay.toString()
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {weekDays.map((day) => (
                            <SelectItem value={day.value} key={day.id}>
                              {day.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <FieldBuilder
                    control={form.control}
                    fieldElement={<Input type="time" />}
                    name={`workHours.${index}.times.open`}
                    title="Inicio"
                  />

                  <FieldBuilder
                    control={form.control}
                    fieldElement={<Input type="time" />}
                    name={`workHours.${index}.times.close`}
                    title="Fim"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <FieldBuilder
                      type="checkbox"
                      control={form.control}
                      fieldElement={<Checkbox />}
                      name={`workHours.${index}.opened`}
                      defaultValue={
                        defaultValues?.workHours ??
                        defaultValues?.workHours[index].opened
                      }
                    />
                  </div>
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
          <div>
            <FieldBuilder
              control={form.control}
              fieldElement={<Checkbox defaultChecked={true} />}
              name="activeMenu"
            />
          </div>
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

        <input
          hidden
          value={slugGen(watchTitle)}
          id="slug"
          {...form.register("slug")}
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

          <Button
            variant="default"
            className="w-full"
            type="submit"
            disabled={loading}
          >
            {defaultValues ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RestaurantForm;
