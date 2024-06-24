import Paginate from "@/components/misc/Paginate";
import { Separator } from "@/components/ui/separator";
import { Prisma } from "@prisma/client";
import { fetchManyAfiliates } from "@/actions/afiliate/fetchManyAfiliates";
import AfiliatesActionBar from "./ActionBar";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AfiliateRow from "../tableRows/Afiliate";

interface AfiliatesPaginationprops {
  page: number;
  query?: Prisma.AfiliateFindManyArgs;
}

const AfiliatesPagination = async ({
  page,
  query,
}: AfiliatesPaginationprops) => {
  const { afiliates, pages } = await fetchManyAfiliates({
    page: page - 1,
    take: 10,
    query,
  });

  return (
    <>
      <div className="w-full h-full py-10 flex gap-5 flex-col">
        <AfiliatesActionBar />

        <Separator />

        <div className="flex flex-col gap-5 h-[calc(100svh-220px)] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="text-center">PIX</TableHead>
                <TableHead className="text-center">Código</TableHead>
                <TableHead>Editar</TableHead>
                <TableHead>Deletar</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {afiliates.map((afiliate) => (
                <AfiliateRow afiliate={afiliate} key={afiliate.id} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex items-center bg-background">
        <Paginate pages={pages} current={page} />
      </div>
    </>
  );
};

export default AfiliatesPagination;
