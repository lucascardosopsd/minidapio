import Paginate from "@/components/misc/Paginate";
import { Separator } from "@/components/ui/separator";
import { Prisma } from "@prisma/client";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchManyAfiliateRelations } from "@/actions/AfiliateAdvertiser/fetchManyAfiliateRelations";
import AfiliateRelationsActionBar from "./ActionBar";
interface AfiliateRelationsPaginationProps {
  page: number;
  query?: Prisma.AfiliateAdvertiserAccountFindManyArgs;
}

const AfiliateRelationsPagination = async ({
  page,
  query,
}: AfiliateRelationsPaginationProps) => {
  const { afiliateRelations, pages } = await fetchManyAfiliateRelations({
    page: page - 1,
    take: 10,
    ...query,
  });

  return (
    <>
      <div className="w-full h-full py-10 flex gap-5 flex-col">
        <AfiliateRelationsActionBar />

        <Separator />

        <div className="flex flex-col gap-5 h-[calc(100svh-220px)] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anunciante</TableHead>

                <TableHead>Plano</TableHead>

                <TableHead>ID</TableHead>

                <TableHead>Editar</TableHead>

                <TableHead>Deletar</TableHead>
              </TableRow>
            </TableHeader>

            {/* <TableBody>
              {advertisers.map((advertiser) => (
                <AdvertiserRow
                  advertiser={advertiser}
                  key={advertiser.id}
                  user={advertiser.user}
                  afiliate={null}
                />
              ))}
            </TableBody> */}
          </Table>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex items-center bg-background">
        <Paginate pages={pages} current={page} />
      </div>
    </>
  );
};

export default AfiliateRelationsPagination;
