import PlansActionBar from "@/components/admin/actionBar/plan";
import { fetchPlansByQuery } from "@/actions/plan/fetchPlansByQuery";
import { Separator } from "@/components/ui/separator";

const PlansPage = async () => {
  const { plans } = await fetchPlansByQuery({ page: 0, take: 1000, query: {} });

  return (
    <section className="w-full h-full pt-5 flex flex-col gap-5 relative">
      <PlansActionBar plans={plans} />

      <Separator />
    </section>
  );
};

export default PlansPage;
