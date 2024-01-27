"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { restaurants } from "@/app/mock/restaurants";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { weekDays } from "@/constants/weekDays";
import { FaTrash } from "react-icons/fa6";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

interface HourProps {
  id: number;
  open: string;
  close: string;
}

interface HoursProps {
  weekDay: number;
  open: boolean;
  hours?: HourProps[];
}

export default function Dashboard() {
  const [hours, setHours] = useState<HoursProps[]>([]);

  const handleAddHour = () => {
    setHours([
      ...hours,
      {
        weekDay: 2,
        open: true,
        hours: [
          {
            id: 1,
            open: "08:00",
            close: "13:00",
          },
          {
            id: 2,
            open: "17:00",
            close: "23:00",
          },
        ],
      },
    ]);
  };

  const handleRemoveHour = (index: number) => {
    setHours((prev) => prev.filter((hour, indexMap) => index !== indexMap));
  };

  return (
    <main className="flex items-center justify-center h-[calc(100svh-4rem)] gap-8 ">
      <div className="space-y-4 w-full">
        <p>Restaurantes</p>

        <Sheet>
          <SheetTrigger className="bg-primary text-background p-2 rounded hover:bg-primary/80 transition">
            Novo Restaurante
          </SheetTrigger>

          <SheetContent className="flex flex-col gap-2">
            <SheetHeader>Novo Restaurante</SheetHeader>
            <SheetDescription>
              <div className="h-[calc(100vh-8rem)] space-y-4 overflow-y-auto pr-5 pb-4">
                <div>
                  <p>Nome*</p>
                  <Input />
                </div>

                <div>
                  <p>Telefone 1*</p>
                  <Input />
                </div>

                <div>
                  <p>Telefone 2</p>
                  <Input />
                </div>

                <div>
                  <p>Endereço*</p>
                  <Input />
                </div>

                <div>
                  <p>Link Maps</p>
                  <Input />
                </div>

                <div>
                  <div>
                    <p>Cor Principal*</p>
                    <Input
                      id="hs-color-input"
                      value="#ffaa00"
                      type="color"
                      className="hidden"
                    />

                    <label
                      htmlFor="hs-color-input"
                      className="h-10 w-full cursor-pointer rounded disabled:opacity-50 disabled:pointer-events-none bg-primary block"
                    />
                  </div>
                </div>

                <div>
                  <p>Observação</p>
                  <Textarea />
                </div>

                <div className="border border-border p-2 rounded space-y-4 flex flex-col">
                  <p>Horários*</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p>Dia</p>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Dia" />
                        </SelectTrigger>

                        <SelectContent>
                          {weekDays.map((day) => (
                            <SelectItem value={day.value} key={day.id}>
                              {day.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Separator />
                    </div>

                    <div>
                      <p>Inicio</p>
                      <Input type="time" />
                    </div>

                    <div>
                      <p>Fim</p>
                      <Input type="time" />
                    </div>

                    <div className="flex items-center gap-2">
                      <p>Ativo</p>
                      <Checkbox />
                    </div>
                  </div>

                  <Button onClick={handleAddHour}>Adicionar</Button>

                  {hours.map((hour) => (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-center border border-border rounded p-2">
                        <p>{weekDays[hour.weekDay].name}</p>
                      </div>

                      <div className="flex gap-2">
                        {hour?.hours?.map((hourData, index) => (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center border border-border rounded p-2">
                              <p>{hourData.open}</p>
                            </div>
                            -
                            <div className="flex items-center justify-center border border-border rounded p-2">
                              <p>{hourData.close}</p>
                            </div>
                            <Button
                              variant="destructive"
                              onClick={() => handleRemoveHour(index)}
                            >
                              <FaTrash />
                            </Button>
                            {hour.hours && index !== hour.hours.length - 1 && (
                              <Separator
                                orientation="vertical"
                                className="bg-muted-foreground"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <p>Cardápio Ativo?</p>
                  <Checkbox value="checked" />
                </div>
              </div>
            </SheetDescription>
            <div className="flex gap-2 items-center">
              <SheetTrigger className="w-full">
                <Button variant="destructive" className="w-full">
                  Cancelar
                </Button>
              </SheetTrigger>
              <SheetTrigger className="w-full">
                <Button variant="default" className="w-full">
                  Confirmar
                </Button>
              </SheetTrigger>
            </div>
          </SheetContent>
        </Sheet>

        <Separator className="w-full" />

        <ScrollArea className="h-[65svh] flex-1">
          <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-4 gap-4 pb-4 tablet:pb-0">
            {restaurants.map((restaurant) => (
              <Card className="w-full" key={restaurant.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <p>{restaurant.title}</p>

                    <Badge
                      variant={restaurant.active ? "default" : "destructive"}
                    >
                      {restaurant.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center gap-2">
                    <Image
                      alt="logo"
                      src={restaurant.logo}
                      width={0}
                      height={0}
                      sizes="1000px"
                      className="rounded-full h-20 w-20"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/restaurant/${restaurant.id}`}
                    className="w-full"
                  >
                    <Button
                      variant={restaurant.active ? "default" : "outline"}
                      className="w-full"
                    >
                      Editar
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
