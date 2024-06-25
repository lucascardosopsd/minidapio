import Paginate from "@/components/misc/Paginate";
import { Separator } from "@/components/ui/separator";
import { Prisma } from "@prisma/client";
import { fetchManyAdvertisers } from "@/actions/advertiser/fetchManyAdvertisers";

import AdvertiserActionBar from "./ActionBar";
import AdvertiserRow from "../tableRows/Advertiser";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAfiliatesByQuery } from "@/actions/afiliate/fetchAfiliatesByQuery";
interface AdvertisersPaginationprops {
  page: number;
  query?: Prisma.AdvertiserAccountFindManyArgs;
}

const AdvertisersPagination = async ({
  page,
  query,
}: AdvertisersPaginationprops) => {
  const { advertisers, pages } = await fetchManyAdvertisers({
    page: page - 1,
    take: 10,
    query,
  });

  return (
    <>
      <div className="w-full h-full py-10 flex gap-5 flex-col">
        <AdvertiserActionBar />

        <Separator />

        <div className="flex flex-col gap-5 h-[calc(100svh-220px)] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>

                <TableHead>Plano</TableHead>

                <TableHead>Afiliado</TableHead>

                <TableHead>Pagamento</TableHead>

                <TableHead className="text-center">ID</TableHead>

                <TableHead>Editar</TableHead>

                <TableHead>Deletar</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {advertisers.map(async (advertiser) => {
                const afiliate = await fetchAfiliatesByQuery({
                  query: {
                    where: {
                      code: advertiser?.afiliateCode || 0,
                    },
                  },
                });

                return (
                  <AdvertiserRow
                    advertiser={advertiser}
                    key={advertiser.id}
                    user={advertiser.user}
                    afiliate={afiliate[0]}
                  />
                );
              })}
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

export default AdvertisersPagination;
