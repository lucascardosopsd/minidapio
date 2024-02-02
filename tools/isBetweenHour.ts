import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const isBetweenHour = (timeStart: string, timeEnd: string): boolean => {
  const hourNowSplit = new Date().toLocaleTimeString("pt-BR").split(":");
  const splitSart = timeStart.split(":");
  const splitEnd = timeEnd.split(":");

  const dateNow = dayjs(
    new Date(
      1,
      1,
      1,
      parseInt(hourNowSplit[0]),
      parseInt(hourNowSplit[1], 0)
    ).toLocaleString("pt-BR")
  );

  const newStartDate = new Date(
    1,
    1,
    1,
    parseInt(splitSart[0]),
    parseInt(splitSart[1])
  ).toLocaleString("pt-BR");

  const newEndDate = new Date(
    1,
    1,
    1,
    parseInt(splitEnd[0]),
    parseInt(splitEnd[1])
  ).toLocaleString("pt-BR");

  const isOpenNow = dayjs(dateNow).isBetween(
    dayjs(newStartDate),
    dayjs(newEndDate)
  );

  return isOpenNow;
};
