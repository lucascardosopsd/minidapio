"use client";

import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { weekDays } from "@/constants/weekDays";
import { Form } from "../ui/form";
import { useRestaurantForm } from "@/hooks/useRestaurantForm";
import { SelectItem } from "../ui/select";
import { Button } from "../ui/button";
import { useFieldArray, useWatch } from "react-hook-form";
import { z } from "zod";
import { restaurantValidator } from "@/validators/restaurant";
import { RestaurantProps } from "@/types/restaurant";
import { paymentMethods } from "@/constants/paymentMethods";
import FieldBuilder from "../builders/FieldBuilder";
import UploadImage from "../UploadImage";
import SelectBuilder from "../builders/SelectBuilder";
import { PatternFormat } from "react-number-format";
import Fence from "../Fence";
import { slugGen } from "@/tools/slugGen";
import { FaRegCopy } from "react-icons/fa6";
import { copyToClipboard } from "@/tools/copyToClipboard";
import ColorPicker from "../ColorPicker";
import { createNewRestaurant } from "@/actions/restaurant/createNewRestaurant";
import { toast } from "sonner";
import { useState } from "react";
import { Session } from "@/types/session";
import { fetchUserRestaurantsByQuery } from "@/actions/restaurant/fetchUserRestaurantsByQuery";

interface RestaurantFormProps {
  defaultValues?: RestaurantProps | undefined;
  toggleOpen?: () => void;
  session: Session | null;
}

const RestaurantForm = ({
  defaultValues = undefined,
  toggleOpen = () => {},
  session,
}: RestaurantFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useRestaurantForm({ defaultValues });

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

  const handleNewRestaurant = async (
    data: z.infer<typeof restaurantValidator>
  ) => {
    console.log(data);

    setLoading(true);

    if (!defaultValues) {
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
    }

    try {
      const slug = slugGen(form.getValues("title"));
      toggleOpen();
      await createNewRestaurant({
        ...data,
        slug,
      });
      form.reset();
      toast("Restaurante Criado");
    } catch (error) {
      toast("Ocorreu um erro.");
    } finally {
      setLoading(false);
    }
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

          <div className="grid grid-cols-3 gap-2">
            {paymentMethods.map((method, index) => (
              <div
                className="flex items-center gap-2 p-2 border border-primary rounded"
                key={index}
              >
                <FieldBuilder
                  type="checkbox"
                  control={form.control}
                  fieldElement={<Checkbox />}
                  name={`methods.${method.label}`}
                />
                <p>{method.title}</p>
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
                <SelectBuilder
                  control={form.control}
                  name={`workHours.${index}.weekDay`}
                  title="Dia"
                  defaultValue={defaultValues?.workHours[
                    index
                  ]?.weekDay.toString()}
                  selectItem={weekDays.map((day) => (
                    <SelectItem value={day.value} key={day.id}>
                      {day.name}
                    </SelectItem>
                  ))}
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
                      defaultValue={defaultValues?.workHours[index].opened}
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

        <p>Link do Cardápio</p>
        <Fence className="bg-primary flex-col">
          <input
            hidden
            value={slugGen(watchTitle)}
            id="slug"
            {...form.register("slug")}
          />

          <div className="flex gap-2 items-center">
            <p className="text-background font-semibold p-4 break-all text-center">
              www.minidapio.com/menu/{session?.id}/{slugGen(watchTitle)}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                copyToClipboard(
                  `www.minidapio.com/menu/${session?.id}/${slugGen(
                    watchTitle
                  )}`,
                  "slug"
                )
              }
            >
              <FaRegCopy className="text-primary" />
            </Button>
          </div>
        </Fence>

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
