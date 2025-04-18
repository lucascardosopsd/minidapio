'use client';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import Moment from 'moment';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Control, Controller, useForm } from 'react-hook-form';

export interface DateRangeFormData {
  startDate: string | Date;
  endDate: string | Date;
}

export interface DateRangeProps {
  startDate?: Date;
  endDate?: Date;
  range?: number;
  onSubmit?: (data: DateRangeFormData) => Promise<void>;
  control?: Control<any>;
  nameStart?: string;
  nameEnd?: string;
  queryKeyNames?: string[];
  className?: string;
}

const DateRange = ({
  startDate,
  endDate,
  range,
  onSubmit,
  control,
  nameStart,
  nameEnd,
  queryKeyNames = ['startDate', 'endDate'],
  className,
}: DateRangeProps) => {
  const moment = Moment();

  const form = useForm({
    defaultValues: {
      endDate: endDate || moment.format('YYYY-MM-DD'),
      startDate: startDate || moment.subtract(range || 30, 'days').format('YYYY-MM-DD'),
    },
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  const handleSearch = (data: DateRangeFormData) => {
    if (data) {
      const startDateStr = data.startDate ? data.startDate.toString() : '';
      const endDateStr = data.endDate ? data.endDate.toString() : '';

      params.set(queryKeyNames[0] as string, startDateStr);
      params.set(queryKeyNames[1] as string, endDateStr);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn('flex gap-5', className)}
        onSubmit={onSubmit ? form.handleSubmit(onSubmit) : form.handleSubmit(handleSearch)}
      >
        <div className="-mr-2">
          <p className="text-xs">Inicio</p>
          <Controller
            name={nameStart || 'startDate'}
            control={control || form.control}
            render={({ field }) => <Input type="date" {...field} />}
          />
        </div>

        <Separator orientation="vertical" />

        <div>
          <p className="text-xs">Fim</p>
          <Controller
            name={nameEnd || 'endDate'}
            control={control || form.control}
            render={({ field }) => <Input type="date" {...field} />}
          />
        </div>

        <Button type="submit" size="icon" className="ml-2 self-end">
          <Search size="16" />
        </Button>
      </form>
    </Form>
  );
};

export default DateRange;
