import { fetchPlansByQuery } from "@/actions/plan/fetchPlansByQuery";
import { AnimatedList } from "@/components/magicui/animated-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

const PlansSection = async () => {
  const { plans } = await fetchPlansByQuery({
    page: 0,
    take: 10,
    query: {
      orderBy: {
        order: "asc",
      },
    },
  });

  return (
    <section className="container w-full h-full flex-col gap-20 tablet:h-[70svh] flex items-center justify-center py-5">
      <div className="flex flex-col">
        <p className="text-4xl tablet:text-6xl text-primary font-semibold text-center">
          Planos
        </p>
        <p className="text-xl text-center max-w-[900px]">
          Um único plano que atende toda a necessidade de cardápio digital da
          sua empresa. Comece grátis por 30 dias e aproveite o plano mais
          generoso do mercado.
        </p>
      </div>

      <AnimatedList delay={200} className="flex-col tablet:flex-row">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              `min-w-64 h-80 flex flex-col bg-background/50 backdrop-blur-lg dark:bg-gradient-to-tl from-foreground/5 to-transparent`,
              plan.highlighted && "border border-primary h-96"
            )}
          >
            <CardHeader>
              <CardTitle>
                <p
                  className={cn(
                    "text-center",
                    plan.highlighted && "text-primary"
                  )}
                >
                  {plan.title}
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 flex-1 items-center justify-center">
              <span dangerouslySetInnerHTML={{ __html: plan.description }} />
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
            </CardFooter>
          </Card>
        ))}
      </AnimatedList>
      <Link href="/auth/register">
        <Button
          variant="outline"
          className="border-primary hover:bg-background text-xl p-10 text-primary"
        >
          Experimente Agora
        </Button>
      </Link>
    </section>
  );
};

export default PlansSection;
