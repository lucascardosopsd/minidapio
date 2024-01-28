"use client";
import { categories } from "@/app/mock/categories";
import { items } from "@/app/mock/items";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CurrencyInput from "react-currency-input-field";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { FaList, FaPen, FaTrash } from "react-icons/fa6";
import { CheckedState } from "@radix-ui/react-checkbox";

export default function Restaurant() {
  const [imageUrl, setImageUrl] = useState<string>();
  const [isPromo, setIsPromo] = useState<CheckedState>(false);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event?.target?.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      console.log();
    }
  };

  return (
    <main className="flex flex-col items-start justify-center h-[calc(100svh-4rem)] gap-4">
      <div className="flex justify-between w-full items-center">
        <p>Categorias</p>

        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button>Nova Categoria</Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Nova Categoria</SheetTitle>
              </SheetHeader>
              <div>
                <p>Nome</p>
                <Input />
              </div>

              <SheetFooter className="py-2">
                <SheetClose asChild>
                  <Button type="submit" className="w-full">
                    Criar
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">Novo Item</Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Novo Item</SheetTitle>
                <SheetDescription>
                  Preencha as informações abaixo para criar um novo item
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-4 h-[75svh] overflow-y-auto p-4">
                <div>
                  <p>Nome*</p>
                  <Input />
                </div>

                <div>
                  <p>Descrição</p>
                  <Input />
                </div>

                <div>
                  <p>Preço*</p>
                  <Input />
                </div>

                <div>
                  <p>Imagem</p>
                  <label
                    htmlFor="imageField"
                    className="flex items-center justify-center h-20 w-full border border-dashed border-border rounded cursor-pointer hover:border-primary transition group"
                  >
                    <div className="group-hover:text-primary transition font-light relative w-full h-full flex items-center justify-center">
                      {!imageUrl && (
                        <p className="z-10 absolute">Clique aqui</p>
                      )}
                      {imageUrl && (
                        <p className="z-10 absolute bg-background p-1 rounded">
                          Substituir
                        </p>
                      )}

                      {imageUrl && (
                        <Image
                          alt="Imagem Poduto"
                          src={imageUrl}
                          height={0}
                          width={0}
                          sizes="1000px"
                          className="w-full h-full object-cover bg-red-500 rounded"
                        />
                      )}
                    </div>
                  </label>
                  <Input
                    type="file"
                    name="imageField"
                    id="imageField"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <p>Destaque</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <p>Ativo</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      onCheckedChange={(state) => setIsPromo(state)}
                      value={isPromo.toString()}
                    />
                    <p>Promoção</p>
                  </div>
                </div>

                <div>
                  <p>Preço</p>
                  <CurrencyInput
                    id="item-price"
                    name="item-price"
                    placeholder="R$0,00"
                    defaultValue={0}
                    decimalsLimit={2}
                    allowNegativeValue={false}
                    allowDecimals
                    prefix="R$"
                    decimalSeparator=","
                    groupSeparator="."
                    onValueChange={(value, name, values) =>
                      console.log(value, name, values)
                    }
                    className="w-full h-10 border border-border rounded bg-background p-4"
                  />
                </div>

                {isPromo && (
                  <div>
                    <p>Preço Promoção</p>
                    <CurrencyInput
                      id="item-price"
                      name="item-price"
                      placeholder="R$0,00"
                      defaultValue={0}
                      decimalsLimit={2}
                      allowNegativeValue={false}
                      allowDecimals
                      prefix="R$"
                      decimalSeparator=","
                      groupSeparator="."
                      onValueChange={(value, name, values) =>
                        console.log(value, name, values)
                      }
                      className="w-full h-10 border border-border rounded bg-background p-4"
                    />
                  </div>
                )}

                <p>Categoria*</p>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem value={category.id.toString()}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <SheetFooter className="py-2">
                <SheetClose asChild>
                  <Button type="submit" className="w-full">
                    Criar
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Separator />

      <ScrollArea className="h-[75svh] w-full mx-auto">
        <Accordion collapsible className="space-y-4">
          {categories.map((category) => (
            <AccordionItem
              className="flex flex-col mx-4 border-none"
              value={category.id}
            >
              <AccordionTrigger className="flex items-center p-4 h-16 w-full border border-border rounded">
                <p>{category.title}</p>
                <div className="flex gap-4 ml-auto mr-2">
                  <Button variant="default">
                    <FaList />
                  </Button>

                  <Button variant="secondary">
                    <FaPen />
                  </Button>

                  <Button variant="destructive">
                    <FaTrash />
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2 p-4 border border-border mt-2 rounded">
                  {items
                    .filter((item) => item.categoryId == category.id)
                    .map((item) => (
                      <div
                        className="flex items-center justify-between h-16 w-full border border-border rounded p-4"
                        key={item.id}
                      >
                        <div className="grid grid-cols-3 gap-4 items-center">
                          <p>{item.title}</p>

                          <div className="flex flex-col">
                            <p
                              className={
                                item.sale.newPrice
                                  ? "line-through text-muted"
                                  : ""
                              }
                            >
                              {item.price.toLocaleString("pt-br", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </p>
                            {item.sale && (
                              <p className="text-primary">
                                {item.sale?.newPrice > 0 &&
                                  item.sale?.newPrice.toLocaleString("pt-br", {
                                    style: "currency",
                                    currency: "BRL",
                                  })}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <p>Destaque</p>
                            <Checkbox checked={item.highlight} />
                          </div>
                        </div>

                        <div className="flex gap-4 ml-auto mr-2">
                          <Button variant="default">
                            <FaList />
                          </Button>

                          <Button variant="secondary">
                            <FaPen />
                          </Button>

                          <Button variant="destructive">
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </main>
  );
}
