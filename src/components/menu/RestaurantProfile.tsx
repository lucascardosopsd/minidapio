"use client";
import { FullRestaurantProps } from "@/types/restaurant";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { SlLocationPin } from "react-icons/sl";
import { Separator } from "../ui/separator";
import { HourProps } from "@/types/hours";
import { isBetweenHour } from "@/tools/isBetweenHour";
import { weekDays } from "@/constants/weekDays";
import { paymentMethods } from "@/constants/paymentMethods";
import ReusableModal from "../misc/ReusableModal";
import CategoriesModalContent from "./modals/content/Categories";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ItemProps } from "@/types/item";
import ItemCard from "./cards/Item";
import SearchField from "../misc/SearchField";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface GroupedHourProps {
  weekDay: string;
  opened: boolean;
  times: [
    {
      open: string;
      close: string;
    }
  ];
}

interface RestaurantProfileProps {
  restaurant: FullRestaurantProps;
  isSearching?: boolean;
  pageSearchParams?: {
    title?: string;
  };
}

const RestaurantProfile = ({
  restaurant,
  pageSearchParams,
}: RestaurantProfileProps) => {
  const themeColor = restaurant?.color || "#fff";
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  let isRestaurantOpened = false;

  const weekDayToday = new Date().getDay();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  const hoursOfDay: HourProps = restaurant.workHours.filter(
    (hour: HourProps) => Number(hour.weekDay) == weekDayToday
  )[0];

  if (hoursOfDay?.times?.open) {
    isRestaurantOpened = isBetweenHour(
      hoursOfDay.times.open,
      hoursOfDay.times.close
    );
  }

  const handleClearSearchParams = () => {
    params.set("title", "");
    replace(`${pathname}?${params.toString()}`);
  };

  let groupedHours: GroupedHourProps[] = [];

  // Crerate
  restaurant.workHours.forEach((hour: HourProps) => {
    const indexDay = groupedHours.findIndex(
      (groupedHour) => groupedHour.weekDay == hour.weekDay
    );

    if (!groupedHours[indexDay]) {
      groupedHours.push({
        weekDay: hour.weekDay,
        opened: hour.opened,
        times: [hour?.times!],
      });
    } else {
      groupedHours[indexDay].times.push(hour?.times!);
    }
  });

  return (
    <>
      <div className="flex justify-center absolute left-0 bottom-0 w-full z-20">
        <Drawer
          open={!!pageSearchParams?.title}
          onClose={handleClearSearchParams}
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-center">Pesquisa</DrawerTitle>
            </DrawerHeader>

            <div className="flex flex-col items-center gap-5 mx-auto w-svw max-w-[500px] p-5 h-[calc(100svh-100px)] overflow-y-auto">
              <div className="w-full">
                <SearchField
                  keyName="title"
                  placeholder="Busque um produto"
                  triggerStyles={{ background: themeColor }}
                />
              </div>

              {restaurant.Items.length ? (
                restaurant.Items.map((item: ItemProps) => (
                  <ItemCard item={item} themeColor={themeColor} key={item.id} />
                ))
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <p>Nenhum item encontrado</p>
                </div>
              )}
            </div>
          </DrawerContent>
        </Drawer>

        <ReusableModal
          trigger="Toque para ver o cardápio"
          title={<span style={{ color: themeColor }}>Menu</span>}
          triggerClassName="w-full rounded-none"
          triggerStyle={{ color: themeColor, borderColor: themeColor }}
          triggerVariant="outline"
          content={
            <div className="max-w-lg mx-auto">
              <CategoriesModalContent
                categories={restaurant.Categories}
                items={restaurant.Items}
                themeColor={themeColor}
                restaurant={restaurant}
              />
            </div>
          }
          onOpen={setIsCategoriesOpen}
          isOpen={isCategoriesOpen}
        />
      </div>

      <div className="bg-gradient-to-t from-background to-transparent h-[250px] w-full absolute bottom-0 left-0 z-10 cursor-none pointer-events-none" />

      <div className="bg-gradient-to-b from-background to-transparent h-[250px] w-full absolute top-0 left-0 z-10 cursor-none pointer-events-none" />

      <div className="flex flex-col items-center justify-center gap-5 relative w-full pb-32 pt-32 ">
        <div className="flex gap-2 items-center justify-center p-2 rounded w-full fixed top-0 z-20 bg-background">
          <Image
            src={restaurant.logo}
            alt="logo"
            height={0}
            width={0}
            sizes="1000px"
            className="w-20 h-20 rounded-full object-cover"
          />

          <div className="flex flex-col items-center ">
            <p style={{ color: themeColor }} className="text-center">
              {restaurant.title}
            </p>

            <Badge
              className={`flex justify-center w-20 ${
                isRestaurantOpened ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {isRestaurantOpened ? "Aberto" : "Fechado"}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-1 text-sm w-full max-w-[400px] p-2 rounded">
          {groupedHours
            .sort((a, b) => Number(a.weekDay) - Number(b.weekDay))
            .map((workHour) => (
              <div
                className="flex flex-col justify-center"
                key={workHour.weekDay}
              >
                <div className="flex flex-col justify-center">
                  <p style={{ color: themeColor }} className="text-center">
                    {
                      weekDays.filter((day) => day.value == workHour.weekDay)[0]
                        .name
                    }
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  {workHour.times!.map((time, index) =>
                    time.open ? (
                      <div className="flex">
                        <p>
                          {time.open}-{time.close}
                        </p>
                        <span
                          className={cn(
                            "hidden ml-2",
                            index < workHour.times.length - 1 && "flex"
                          )}
                        >
                          |
                        </span>
                      </div>
                    ) : (
                      <Badge variant="destructive">Fechado</Badge>
                    )
                  )}
                </div>
              </div>
            ))}
        </div>

        <div className="flex flex-col items-center gap-1 text-sm  p-2 rounded w-full">
          <p>{restaurant.whatsapp}</p>
          <Separator style={{ background: themeColor }} />
          <p>{restaurant.landline}</p>
        </div>

        <div className="flex gap-1 text-sm">
          {Object.entries(restaurant.methods).map(([key, value], index) => (
            <span key={key} className="flex gap-1">
              {paymentMethods.map(
                (payment) =>
                  key == payment.label && (
                    <p key={payment.title}>{payment.title}</p>
                  )
              )}

              {index !== Object.entries(restaurant.methods).length! - 1 && (
                <p className="mr-1" style={{ color: themeColor }}>
                  |
                </p>
              )}
            </span>
          ))}
        </div>
        {restaurant.linkMaps && (
          <Link href={restaurant.linkMaps} target="_blank">
            <Button
              className="bg-background"
              variant="outline"
              style={{ borderColor: themeColor, color: themeColor }}
              size="sm"
            >
              <p>Ver no Mapa</p>
              <SlLocationPin size={24} />
            </Button>
          </Link>
        )}

        <p className="text-center text-sm">{restaurant.address}</p>

        <div className="flex flex-col items-center text-sm">
          {restaurant.note && (
            <>
              <p className="text-yellow-500 font-semibold">Atenção!</p>
              <p className="text-justify ">{restaurant.note}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RestaurantProfile;
