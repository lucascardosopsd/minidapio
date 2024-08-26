import PlansActionBar from "@/components/admin/actionBar/plan";
import { fetchPlansByQuery } from "@/actions/plan/fetchPlansByQuery";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PlanRow from "@/components/admin/tableRows/Plan";

const PlansPage = async () => {
  const { plans } = await fetchPlansByQuery({ page: 0, take: 1000, query: {} });

  return (
    <section className="w-full h-full pt-5 flex flex-col gap-5 relative">
      <PlansActionBar plans={plans} />

      <Separator />

      <div className="flex flex-col gap-5 h-[calc(100svh-120px)] overflow-y-auto pb-20">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>

              <TableHead>Apelido</TableHead>
              <TableHead>Ordem</TableHead>

              <TableHead>Preço</TableHead>

              <TableHead>Nível</TableHead>

              <TableHead>Editar</TableHead>

              <TableHead>Deletar</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {plans.map((plan) => (
              <PlanRow key={plan.id} plan={plan} />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default PlansPage;
