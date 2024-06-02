import { HourProps } from "@/types/hours";

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

export const groupHours = (
  restaurantHours: HourProps[]
): GroupedHourProps[] => {
  let groupedHours: GroupedHourProps[] = [];

  restaurantHours.forEach((hour: HourProps) => {
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

  return groupedHours;
};
