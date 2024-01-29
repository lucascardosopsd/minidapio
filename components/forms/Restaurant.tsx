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
import { SheetClose } from "../ui/sheet";
import Image from "next/image";
import { RestaurantProps } from "@/types/restaurant";

interface RestaurantFormProps {
  defaultValues?: Partial<RestaurantProps> | undefined;
}

const RestaurantForm = ({ defaultValues = {} }: RestaurantFormProps) => {
  const form = useRestaurantForm({ defaultValues });
  const openRef = useRef(null);

  const [logoFile, setLogoFile] = useState<string>("");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        className="space-y-4 pb-10 relative"
      >
        {/* Basic */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone 1*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone 2</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkMaps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link do Google Maps</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor Principal*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="hs-color-input"
                    value="#ffaa00"
                    type="color"
                    className="hidden"
                  />
                </FormControl>
                <FormMessage />

                <label
                  htmlFor="hs-color-input"
                  className="h-10 w-full cursor-pointer rounded disabled:opacity-50 disabled:pointer-events-none bg-primary block"
                />
              </FormItem>
            )}
          />
        </div>

        {/* Logo */}
        <div className="relative">
          <Input
            type="file"
            accept="image/*"
            id="logo"
            onChange={handleImageChange}
            className="hidden"
          />

          <label
            htmlFor="logo"
            className={`flex w-full h-80 border border-dashed relative items-center justify-center hover:border-primary transition cursor-pointer rounded ${
              logoFile && "border-primary"
            }`}
          >
            <p className="absolute bg-background z-10 p-2 text-primary rounded">
              {logoFile ? "Substituir imagem" : "Clique para subir a Imagem"}
            </p>
            {(logoFile || defaultValues.logo) && (
              <Image
                height={0}
                width={0}
                src={(logoFile || defaultValues.logo) ?? ""}
                alt="logo"
                sizes="1000px"
                className="h-full w-full absolute left-0 top-0 rounded object-cover"
              />
            )}
          </label>
        </div>

        {/* Hours */}
        <div className="border border-border p-2 rounded space-y-4 flex flex-col">
          <p>Horários*</p>

          {workHoursFields.map((_, index) => (
            <span key={index}>
              <div className="flex flex-col gap-2 border border-primary rounded p-2">
                <div className="">
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
                </div>

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
          <FormField
            control={form.control}
            name="activeMenu"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    defaultChecked
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p>Cardápio ativo?</p>
        </div>

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observação</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Deseja deixar uma observação para o cliente no cardápio?"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 items-center">
          <SheetClose asChild className="w-full">
            <Button variant="destructive" className="w-full" type="button">
              Cancelar
            </Button>
          </SheetClose>

          <Button variant="default" className="w-full" type="submit">
            Criar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RestaurantForm;
