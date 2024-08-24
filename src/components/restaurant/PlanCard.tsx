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
import { PlanProps } from "@/types/plan";

interface PlanCardProps {
  plan: PlanProps;
}

const PlanCard = ({ plan }: PlanCardProps) => {
  return (
    <Card className={cn(plan.highLight && "border border-primary")}>
      <CardHeader>
        <CardTitle>
          <p className={cn("text-center", plan.highLight && "text-primary")}>
            {plan.title}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {plan.features.map((feature) => (
          <p>☑️ {feature}</p>
        ))}
      </CardContent>
      <CardFooter className="flex-col gap-5">
        <span
          className={cn(
            "text-2xl font-semibold flex items-center",
            !plan.highLight && "font-light"
          )}
        >
          {plan.price.toLocaleString("pt-BR", {
            currency: "BRL",
            style: "currency",
          })}
          <p className="text-sm">/Mês</p>
        </span>

        <Link href={plan.link} className="w-full">
          <Button
            className="w-full"
            variant={plan.highLight ? "default" : "outline"}
          >
            Assinar
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
