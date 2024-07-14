import Paginate from "@/components/misc/Paginate";
import { Separator } from "@/components/ui/separator";
import { AdvertiserAccount, Afiliate, Prisma, User } from "@prisma/client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AfiliateRelationsActionBar from "./ActionBar";
import { fetchManyAdvertisers } from "@/actions/advertiser/fetchManyAdvertisers";
import AdvertiserRow from "../../tableRows/Advertiser";
import { checkMonthlyPayment } from "@/actions/payments/checkMonthlyPayment";

interface AdvertiserWithPaidProps extends AdvertiserAccount {
  user: User;
  paid: boolean;
}

interface AfiliateRelationsPaginationProps {
  page: number;
  query?: Prisma.AdvertiserAccountFindManyArgs;
  afiliate: Afiliate;
  user: User;
}

const AfiliateRelationsPagination = async ({
  page,
  query,
  afiliate,
  user,
}: AfiliateRelationsPaginationProps) => {
  const { advertisers, pages } = await fetchManyAdvertisers({
    page: page - 1,
    take: 10,
    query,
  });

  const paymentFilter = null;

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
        <AfiliateRelationsActionBar user={user} />

        <Separator />

        <div className="flex flex-col gap-5 h-[calc(100svh-220px)] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anunciante</TableHead>

                <TableHead>ID</TableHead>

                <TableHead>Deletar</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {advertisersByFilter.map((advertiser) => (
                <AdvertiserRow
                  advertiser={advertiser}
                  afiliate={afiliate}
                  key={advertiser.id}
                />
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

export default AfiliateRelationsPagination;
