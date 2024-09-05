import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Step1Notice = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-5">
      <p className="text-2xl font-semibold text-primary">Plano alterado</p>
      <p className="text-foreground text-lg">
        O nível do plano foi alterado para um inferior, por conta disso será
        necessário adaptar-se a este plano desativando restaurantes, categorias
        e itens conforme necessário.
      </p>

      <p className="text-foreground text-lg">
        Nos próximos passos você será guiado pela adptação, clique em{" "}
        <span className="text-primary font-semibold">"Próximo"</span>.
      </p>

      <Separator />

      <p className="text-center">
        Clique no botão abaixo se deseja desistir do rebaixamento de plano e
        assinar o plano anterior ou superior se disponível
      </p>

      <Link href="/dashboard/plans">
        <Button
          className="bg-green-500 text-zinc-950 font-semibold"
          variant="outline"
        >
          Consultar Planos
        </Button>
      </Link>
    </div>
  );
};

export default Step1Notice;
