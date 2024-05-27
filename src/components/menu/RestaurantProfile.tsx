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

interface RestaurantProfileProps {
  restaurant: FullRestaurantProps;
}

const RestaurantProfile = ({ restaurant }: RestaurantProfileProps) => {
  const themeColor = restaurant?.color || "#fff";

  let isRestaurantOpened = false;

  const weekDayToday = new Date().getDay();

  const hoursOfDay: HourProps = restaurant.workHours.filter(
    (hour: HourProps) => Number(hour.weekDay) == weekDayToday
  )[0];

  if (hoursOfDay?.times?.open) {
    isRestaurantOpened = isBetweenHour(
      hoursOfDay.times.open,
      hoursOfDay.times.close
    );
  }

  return (
    <>
      <div className="flex justify-center absolute left-0 bottom-0 w-full z-20">
        <ReusableModal
          trigger="Toque para ver o cardápio"
          title={<span style={{ color: themeColor }}>Menu</span>}
          triggerClassName="w-full rounded-none"
          triggerStyle={{ color: themeColor, borderColor: themeColor }}
          triggerVariant="outline"
          content={
            <CategoriesModalContent
              categories={restaurant.Categories}
              items={restaurant.Items}
              themeColor={themeColor}
              restaurant={restaurant}
            />
          }
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
          {restaurant.workHours
            .sort(
              (workHour: HourProps) =>
                Number(workHour.weekDay) - Number(workHour.weekDay)
            )
            .map((workHour: HourProps) => (
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
                  {workHour.times!.open ? (
                    <div className="flex">
                      <p>
                        {workHour.times!.open}-{workHour.times!.close}
                      </p>
                    </div>
                  ) : (
                    <Badge variant="destructive">Fechado</Badge>
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
