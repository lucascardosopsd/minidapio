import PlanCard from "@/components/restaurant/PlanCard";
import { Separator } from "@/components/ui/separator";
import { plans } from "@/constants/plans";

const PlansPage = () => {
  return (
    <div className="flex flex-col tablet:items-center tablet:flex-row gap-5 mx-auto">
      <div className="flex flex-col gap-2">
        <p className="text-4xl text-center">Eleve o nível do seu restaurante</p>
        <p className="max-w-[400px] text-center mx-auto">
          Escolha um plano e agregue ainda mais à experiência do seu cliente
        </p>
      </div>

      <Separator orientation="vertical" className="hidden tablet:block" />
      <Separator orientation="horizontal" className="block tablet:hidden" />

      {plans.map((plan, index) => (
        <PlanCard plan={plan} key={index} />
      ))}
    </div>
  );
};

export default PlansPage;
