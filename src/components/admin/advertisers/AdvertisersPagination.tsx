import Paginate from "@/components/misc/Paginate";
import { Separator } from "@/components/ui/separator";
import { AdvertiserAccount, Prisma, Region, User } from "@prisma/client";
import { fetchManyAdvertisers } from "@/actions/paymentProfile/fetchManyAdvertisers";

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
import { checkMonthlyPayment } from "@/actions/subscription/checkMonthlyPayment";

interface AdvertiserWithPaidProps extends AdvertiserAccount {
  user: User;
  paid: boolean;
}

interface AdvertisersPaginationprops {
  page: number;
  paymentFilter?: "paid" | "unpaid" | null;
  query?: Prisma.AdvertiserAccountFindManyArgs;
  regions: Region[];
}

const AdvertisersPagination = async ({
  page,
  query,
  paymentFilter,
  regions,
}: AdvertisersPaginationprops) => {
  const { advertisers, pages } = await fetchManyAdvertisers({
    page: page - 1,
    take: 10,
    query,
  });

  let advertisersByFilter: AdvertiserWithPaidProps[] = [];

  for (let advertiser of advertisers) {
    let hasPaidRes = await checkMonthlyPayment({ userId: advertiser.userId });

    if (hasPaidRes && paymentFilter === "paid") {
      advertisersByFilter.push({
        ...advertiser,
        paid: true,
      });
    } else if (!hasPaidRes && paymentFilter === "unpaid") {
      advertisersByFilter.push({
        ...advertiser,
        paid: false,
      });
    } else if (!paymentFilter) {
      let hasPaidRes = await checkMonthlyPayment({ userId: advertiser.userId });

      advertisersByFilter.push({
        ...advertiser,
        paid: hasPaidRes,
      });
    }
  }

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

                <TableHead>Região</TableHead>

                {/* <TableHead className="text-center">ID</TableHead> */}

                <TableHead className="text-center">Anúncio</TableHead>
                <TableHead>Editar</TableHead>

                <TableHead>Deletar</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {advertisersByFilter.map(async (advertiser) => {
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
                    afiliate={afiliate[0]}
                    regions={regions}
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
