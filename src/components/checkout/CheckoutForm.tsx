import { User } from "@prisma/client";
import { Plan } from "@/types/plan";

interface CheckoutFormProps {
  plan: Plan;
  user: User;
}

export const CheckoutForm = ({ plan, user }: CheckoutFormProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Resumo do Pedido</h2>
        <p className="text-muted-foreground">
          Confira os detalhes do seu pedido
        </p>
      </div>

      <div className="flex flex-col gap-4 p-4 border rounded-lg">
        <div className="flex justify-between">
          <span>Plano</span>
          <span className="font-medium">{plan.name}</span>
        </div>
        <div className="flex justify-between">
          <span>Preço</span>
          <span className="font-medium">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(plan.price)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Período</span>
          <span className="font-medium">Mensal</span>
        </div>
      </div>
    </div>
  );
}; 