import { WorkHourProps } from '@/types/restaurant';

interface GroupedHourProps {
  weekDay: number;
  opened: boolean;
  times: [
    {
      open: string | null;
      close: string | null;
    },
  ];
}

export const groupHours = (restaurantHours: WorkHourProps[]): GroupedHourProps[] => {
  let groupedHours: GroupedHourProps[] = [];

  restaurantHours.forEach((hour: WorkHourProps) => {
    const indexDay = groupedHours.findIndex(groupedHour => groupedHour.weekDay == hour.weekDay);

    if (!groupedHours[indexDay]) {
      groupedHours.push({
        weekDay: hour.weekDay,
        opened: hour.opened,
        times: [hour?.times],
      });
    } else {
      groupedHours[indexDay].times.push(hour?.times);
    }
  });

  return groupedHours;
};
