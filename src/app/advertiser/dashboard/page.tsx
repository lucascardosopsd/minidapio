import { fetchAds } from "@/actions/ad/fetchAds";
import { getUserServerSession } from "@/actions/session/getUserServerSession";
import AdCard from "@/components/advertiser/cards/Ad";
import StatsCard from "@/components/advertiser/cards/Stats";
import DateRange from "@/components/advertiser/inputs/DateRange";
import PersistentDialog from "@/components/advertiser/persistentDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FullAdProps } from "@/types/ad";
import { UserPropsWithAdvertiser } from "@/types/user";
import { Eye, MousePointerClick } from "lucide-react";
import Link from "next/link";

interface AdvertiserDashboardprops {
  searchParams?: {
    startDate?: Date;
    endDate?: Date;
  };
}

const AdvertiserDashboard = async ({
  searchParams,
}: AdvertiserDashboardprops) => {
  const user = await getUserServerSession<UserPropsWithAdvertiser>({
    query: {
      include: {
        AdvertiserAccount: true,
      },
    },
  });
  const startDate = searchParams?.startDate;
  const endDate = searchParams?.endDate;

  const { ads } = (await fetchAds({
    page: 0,
    take: 100,
    query: {
      where: {
        userId: user?.id,
      },
      include: {
        clicks:
          startDate && endDate
            ? {
                where: {
                  createdAt: {
                    lte: new Date(endDate),
                    gte: new Date(startDate),
                  },
                },
              }
            : true,
        views:
          startDate && endDate
            ? {
                where: {
                  createdAt: {
                    lte: new Date(endDate),
                    gte: new Date(startDate),
                  },
                },
              }
            : true,
      },
    },
  })) as unknown as {
    ads: FullAdProps[];
    count: number;
  };

  const views = ads.reduce(
    (prev, current) => current?.views && prev + current.views.length,
    0
  );

  const clicks = ads.reduce(
    (prev, current) => current?.clicks && prev + current.clicks.length,
    0
  );

  const rankViewed = ads
    .sort((a, b) => a?.views?.length - b?.views?.length)
    .slice(0, 5);

  const rankClicked = ads
    .sort((a, b) => a?.clicks?.length - b?.clicks?.length)
    .slice(0, 5);

  const isOpenedModal = !user?.AdvertiserAccount;

  return (
    <section className="h-svh w-full flex flex-col items-center space-y-5 overflow-y-auto pb-5">
      {!user?.AdvertiserAccount && (
        <PersistentDialog
          title="Perfil de anunciante não encontrado"
          description={
            <div className="flex  flex-col gap-5">
              <p>
                É necessário preencher as informações de anunciante para
                prosseguir
              </p>
              <Link href="/advertiser/config" className="self-end">
                <Button>Clique aqui</Button>
              </Link>
            </div>
          }
          open={isOpenedModal}
        />
      )}

      <div className="w-full flex justify-between border-b px-10 items-center py-5">
        <p className="text-4xl">Dashboard</p>

        <DateRange
          startDate={startDate || undefined}
          endDate={endDate || undefined}
        />
      </div>

      <div className="px-5 w-full space-y-5">
        <div className="flex gap-5 p-5 border rounded-lg w-full">
          <StatsCard
            title="Visualizações no Período"
            icon={Eye}
            content={<p className="text-2xl text-center">{views}</p>}
          />

          <StatsCard
            title="Clicks Totais"
            icon={MousePointerClick}
            content={<p className="text-2xl text-center">{clicks}</p>}
          />

          <StatsCard
            title="visualizações/clicks"
            icon={MousePointerClick}
            content={
              <p className="text-2xl text-center">
                {clicks && views
                  ? ((clicks / views) * 100).toFixed(2).replace(".", ",")
                  : 0}
              </p>
            }
          />
        </div>

        <Separator />

        <div className="flex gap-5 w-full">
          <div className="flex flex-col gap-5 flex-1">
            <p className="2xl">Mais Vistos</p>

            <div className="flex flex-col gap-5 border rounded-lg p-5">
              {views ? (
                rankViewed.map((ad) => <AdCard ad={ad} key={ad.id} />)
              ) : (
                <></>
              )}
            </div>
          </div>

          <Separator orientation="vertical" />

          <div className="flex flex-col gap-5 flex-1">
            <p className="2xl">Mais Clicados</p>

            <div className="flex flex-col gap-5 border rounded-lg p-5">
              {clicks ? (
                rankClicked.map((ad) => <AdCard ad={ad} key={ad.id} />)
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvertiserDashboard;
