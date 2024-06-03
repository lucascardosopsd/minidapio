import { fetchRegions } from "@/actions/region/fetchRegions";
import RegionsActionBar from "@/components/admin/region/ActionBar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RegionRow from "@/components/admin/tableRows/Region";

const RegionsPage = async () => {
  const regions = await fetchRegions();

  return (
    <section className="space-y-5 w-full h-full pt-5">
      <RegionsActionBar />

      <Separator />
      <div className="h-[calc(100svh-170px)] overflow-y-auto w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Região</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Editar</TableHead>
              <TableHead>Deletar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regions.map((region) => (
              <RegionRow region={region} key={region.id} />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default RegionsPage;
