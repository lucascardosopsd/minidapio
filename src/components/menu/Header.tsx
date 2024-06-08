"use client";
import { cn } from "@/lib/utils";
import { isBetweenHour } from "@/tools/isBetweenHour";
import { HourProps } from "@/types/hours";
import { FullRestaurantProps } from "@/types/restaurant";
import { Menu } from "lucide-react";
import Image from "next/image";
import ReusableModal from "../misc/ReusableModal";
import RestaurantProfile from "./RestaurantProfile";
import FavoritesModal from "./FavoritesModal";

interface MenuHeaderProps {
  restaurant: FullRestaurantProps;
}

const MenuHeader = ({ restaurant }: MenuHeaderProps) => {
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
    <div className="flex items-center justify-between h-20 border-b w-full pr-2">
      <div className="flex gap-5 items-center">
        <div className="h-full w-auto">
          <Image
            alt="logo"
            src={restaurant.logo}
            height={500}
            width={500}
            className="w-auto h-20 object-cover"
          />
        </div>

        <div className="flex flex-col text-sm">
          <p>{restaurant.title}</p>
          <p
            className={cn(
              "font-semibold",
              isRestaurantOpened ? "text-green-500" : "text-red-500"
            )}
          >
            {isRestaurantOpened ? "Aberto" : "Fechado"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <FavoritesModal
          themeColor={restaurant.color}
          items={restaurant.Items}
        />

        <ReusableModal
          trigger={<Menu style={{ color: restaurant.color }} size={32} />}
          triggerVariant="ghost"
          triggerClassName="border-none"
          title="Perfil do restaurante"
          content={<RestaurantProfile restaurant={restaurant} />}
        />
      </div>
    </div>
  );
};

export default MenuHeader;
