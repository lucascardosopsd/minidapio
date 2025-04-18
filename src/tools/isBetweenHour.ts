import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const isBetweenHour = (timeStart: string, timeEnd: string): boolean => {
  const hourNowSplit = new Date().toLocaleTimeString('pt-BR').split(':');
  const splitSart = timeStart.split(':');
  const splitEnd = timeEnd.split(':');

  const dateNow = dayjs(
    new Date(
      1,
      1,
      1,
      parseInt(hourNowSplit[0] as string),
      parseInt(hourNowSplit[1] as string, 0)
    ).toLocaleString('pt-BR')
  );

  const newStartDate = new Date(
    1,
    1,
    1,
    parseInt(splitSart[0] as string),
    parseInt(splitSart[1] as string)
  ).toLocaleString('pt-BR');

  const newEndDate = new Date(
    1,
    1,
    1,
    parseInt(splitEnd[0] as string),
    parseInt(splitEnd[1] as string)
  ).toLocaleString('pt-BR');

  const isOpenNow = dayjs(dateNow).isBetween(dayjs(newStartDate), dayjs(newEndDate));

  return isOpenNow;
};
