import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Plan } from "@prisma/client";

interface PlanCardProps {
  plan: Plan;
  current: boolean;
  disabled?: boolean;
}

const PlanCard = ({ plan, current, disabled }: PlanCardProps) => {
  const html = { __html: plan.description };

  return (
    <Card
      className={cn(
        `w-full flex flex-col tablet:flex-row items-center bg-background/50 backdrop-blur-lg p-10 gap-10`,
        plan.highlighted && "border border-primary"
      )}
    >
      <CardHeader>
        <CardTitle>
          <p
            className={cn(
              "text-center p-0",
              plan.highlighted && "text-primary"
            )}
          >
            {plan.title}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 flex-1 items-center justify-center p-0">
        <span dangerouslySetInnerHTML={html} />
      </CardContent>
      <CardFooter className="flex-col gap-5 p-0">
        <span
          className={cn(
            "text-2xl font-semibold flex items-center",
            !plan.highlighted && "font-light"
          )}
        >
          {plan.price.toLocaleString("pt-BR", {
            currency: "BRL",
            style: "currency",
          })}
          <p className="text-sm">/Mês</p>
        </span>

        <Link href={`/dashboard/checkout/${plan.alias}`} className="w-full">
          <Button
            className={cn("w-full", !current && "border border-primary")}
            variant={plan.highlighted ? "default" : "outline"}
            disabled={current || disabled}
          >
            {current ? "Atual" : "Assinar"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
