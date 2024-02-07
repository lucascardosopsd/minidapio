"use client";
import { RestaurantProps } from "@/types/restaurant";
import Image from "next/image";
import { HourProps, TimesProps } from "@/types/hours";
import { Badge } from "./ui/badge";
import { isBetweenHour } from "@/tools/isBetweenHour";
import Link from "next/link";
import { Button } from "./ui/button";
import { SlLocationPin } from "react-icons/sl";
import { weekDays } from "@/constants/weekDays";
import CategoriesSheet from "./sheets/Categories";
import { Separator } from "./ui/separator";

interface RestaurantProfileProps {
  restaurant: RestaurantProps;
}

const RestaurantProfile = ({ restaurant }: RestaurantProfileProps) => {
  const themeColor = restaurant.color;

  let isRestaurantOpened = false;

  const weekDayToday = new Date().getDay();

  const hoursOfDay: HourProps = restaurant.workHours.filter(
    (hour: HourProps) => Number(hour.weekDay) == weekDayToday
  )[0];

  if (hoursOfDay.times) {
    hoursOfDay.times.forEach((time: TimesProps) => {
      isRestaurantOpened = isBetweenHour(time.open, time.close);
    });
  }

  return (
    <>
      <div className="flex justify-center absolute bottom-0 m-0 left-0 right-0 w-full z-10">
        <CategoriesSheet
          triggerVariant="outline"
          triggerText="Toque para ver o cardápio"
          themeColor={themeColor}
          restaurantId={restaurant.id}
          triggerClassname="w-full rounded-none py-6"
          triggerStyle={{ backgroundColor: themeColor }}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-5 py-5 relative w-full pb-20">
        <div
          className="flex gap-2 items-center border p-2 rounded"
          style={{ borderColor: themeColor }}
        >
          <Image
            src={restaurant.logo}
            alt="logo"
            height={0}
            width={0}
            sizes="1000px"
            className="w-20 h-20 rounded-full object-cover border"
            style={{ borderColor: themeColor }}
          />

          <div className="flex flex-col items-center">
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

        <div
          className="flex flex-col justify-center gap-1 text-sm w-full max-w-[400px] border p-2 rounded"
          style={{ borderColor: themeColor }}
        >
          {restaurant.workHours.map((workHour: HourProps) => (
            <div className="flex flex-col justify-center">
              <div className="flex flex-col justify-center">
                <p style={{ color: themeColor }} className="text-center">
                  {
                    weekDays.filter((day) => day.value == workHour.weekDay)[0]
                      .name
                  }
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {workHour.times?.length ? (
                  workHour.times.map((time: TimesProps, index) => (
                    <div className="flex">
                      <p>
                        {time.open}-{time.close}
                      </p>
                      {workHour.times &&
                        workHour.times.length - 1 !== index && (
                          <p className="ml-2" style={{ color: themeColor }}>
                            |
                          </p>
                        )}
                    </div>
                  ))
                ) : (
                  <Badge variant="destructive">Fechado</Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col items-center gap-1 text-sm  border p-2 rounded w-full"
          style={{ borderColor: themeColor }}
        >
          <p>{restaurant.whatsapp}</p>
          <Separator style={{ background: themeColor }} />
          <p>{restaurant.landline}</p>
        </div>

        <div className="flex gap-1 text-sm">
          {restaurant.methods.map((method: string, index) => (
            <>
              <p>{method}</p>

              {index !== restaurant.methods.length! - 1 && (
                <p className="mr-1" style={{ color: themeColor }}>
                  |
                </p>
              )}
            </>
          ))}
        </div>
        {restaurant.linkMaps && (
          <Link href={restaurant.linkMaps}>
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
          <p className="text-yellow-500 font-semibold">Atenção!</p>
          {restaurant.note && (
            <p className="text-justify ">{restaurant.note}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RestaurantProfile;
