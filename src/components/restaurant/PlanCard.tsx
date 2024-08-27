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
}

const PlanCard = ({ plan, current }: PlanCardProps) => {
  const html = { __html: plan.description };

  return (
    <Card
      className={cn(
        `min-w-64  h-80 flex flex-col bg-background/50 backdrop-blur-lg `,
        plan.highlighted && "border border-primary h-96"
      )}
    >
      <CardHeader>
        <CardTitle>
          <p className={cn("text-center", plan.highlighted && "text-primary")}>
            {plan.title}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 flex-1 items-center justify-center">
        <span dangerouslySetInnerHTML={html} />
      </CardContent>
      <CardFooter className="flex-col gap-5">
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

        <Link href={`/dashboard//payment/${plan.alias}`} className="w-full">
          <Button
            className={cn("w-full", !current && "border border-primary")}
            variant={plan.highlighted ? "default" : "outline"}
            disabled={current}
          >
            {current ? "Atual" : "Assinar"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
