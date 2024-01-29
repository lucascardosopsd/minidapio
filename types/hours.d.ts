export interface TimesProps {
  open: string;
  close: string;
}

export interface HourProps {
  weekDay: string;
  opened: boolean;
  times?: TimesProps;
}
