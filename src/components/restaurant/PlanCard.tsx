import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import { Plan } from '@prisma/client';

// Extended type with highlighted property
type ExtendedPlan = Plan & {
  highlighted?: boolean;
};

interface PlanCardProps {
  plan: ExtendedPlan;
  current: boolean;
  disabled?: boolean;
}

const PlanCard = ({ plan, current, disabled }: PlanCardProps) => {
  const html = { __html: plan.description };

  return (
    <Card
      className={cn(
        `flex w-full flex-col items-center gap-5 bg-background/50 p-5 py-10 backdrop-blur-lg desktop:flex-row`,
        plan.highlighted && 'border border-primary'
      )}
    >
      <CardHeader className="flex-1">
        <CardTitle>
          <p className={cn('p-0 text-center', plan.highlighted && 'text-primary')}>{plan.title}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-[2] flex-col items-center justify-center gap-2 p-0">
        <span dangerouslySetInnerHTML={html} />
      </CardContent>
      <CardFooter className="flex-1 flex-col p-0">
        <span
          className={cn(
            'flex items-center text-2xl font-semibold',
            !plan.highlighted && 'font-light'
          )}
        >
          {plan.price.toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          })}
          <p className="text-sm">/Mês</p>
        </span>

        <Link href={!current ? `/dashboard/checkout/${plan.alias}` : '#'} className="w-full">
          <Button
            className={cn('w-full', !current && 'border border-primary')}
            variant={plan.highlighted ? 'default' : 'outline'}
            disabled={current || disabled}
          >
            {current ? 'Em dia' : 'Assinar'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
