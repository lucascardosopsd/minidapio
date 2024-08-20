import { fetchManyAds } from "@/actions/ad/fetchManyAds";
import { fetchManyAdvertisers } from "@/actions/advertiser/fetchManyAdvertisers";
import { fetchManyPayments } from "@/actions/payments/fetchManyPayments";
import { fetchManyRestaurants } from "@/actions/restaurant/fetchManyRestaurants";
import { fetchManyUsers } from "@/actions/user/fetchManyUsers";
import StatsCard from "@/components/advertiser/cards/Stats";
import DateRange from "@/components/advertiser/inputs/DateRange";
import { formatPrice } from "@/tools/formatPrice";
import { Ad, View } from "@prisma/client";
import {
  DollarSign,
  Eye,
  Image,
  Megaphone,
  User,
  UtensilsCrossed,
} from "lucide-react";

interface AdWithViews extends Ad {
  views: View[];
}

interface AdsWithViewsReturn extends Ad {
  ads: AdWithViews[];
  total: number;
}

interface AdminDashboardProps {
  searchParams?: {
    startDate?: Date;
    endDate?: Date;
  };
}

const AdminDashboard = async ({ searchParams }: AdminDashboardProps) => {
  const startDate = searchParams?.startDate;
  const endDate = searchParams?.endDate;

  const { users } = await fetchManyUsers({
    page: 0,
    take: 1000000,
    query: {
      where: endDate &&
        startDate && {
          createdAt: {
            lte: new Date(endDate),
            gte: new Date(startDate),
          },
        },
    },
  });

  const { restaurants } = await fetchManyRestaurants({
    page: 0,
    take: 1000000,
  });

  const { ads } = await fetchManyAds<AdsWithViewsReturn>({
    page: 0,
    take: 1000,
    query: {
      where:
        startDate && endDate
          ? {
              createdAt: {
                lte: new Date(endDate),
                gte: new Date(startDate),
              },
              active: true,
            }
          : {
              active: true,
            },
      include: {
        views: true,
      },
    },
  });

  const { advertisers } = await fetchManyAdvertisers({
    page: 0,
    take: 1000000,
    query: {
      where: endDate &&
        startDate && {
          createdAt: {
            lte: new Date(endDate),
            gte: new Date(startDate),
          },
        },
      include: {
        user: true,
      },
    },
  });

  const { payments } = await fetchManyPayments({
    page: 0,
    take: 10000,
    query: {
      where: endDate &&
        startDate && {
          createdAt: {
            lte: new Date(endDate),
            gte: new Date(startDate),
          },
        },
    },
  });

  const revenue = payments.reduce(
    (prev, current) => (prev += current.value),
    0
  );

  const totalViews = ads.reduce(
    (prev, current) => current.views.length + prev,
    0
  );

  return (
    <section className="flex flex-col items-center justify-center overflow-y-auto h-screen">
      <div className="border rounded p-5 flex flex-col gap-5">
        <p className="text-2xl text-primary">Período</p>

        <DateRange
          startDate={startDate || undefined}
          endDate={endDate || undefined}
          className="justify-center"
        />

        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-5">
          <StatsCard
            title="Usuários totais"
            icon={User}
            content={<p className="text-4xl text-center">{users.length}</p>}
          />

          <StatsCard
            title="Anunciantes totais"
            icon={Megaphone}
            content={
              <p className="text-4xl text-center">{advertisers.length}</p>
            }
          />

          <StatsCard
            title="Anuncios totais"
            icon={Image}
            content={<p className="text-4xl text-center">{ads.length}</p>}
          />

          <StatsCard
            title="Anuncios totais"
            icon={Image}
            content={<p className="text-4xl text-center">{ads.length}</p>}
          />

          <StatsCard
            title="Restaurantes totais"
            icon={UtensilsCrossed}
            content={
              <p className="text-4xl text-center">{restaurants.length}</p>
            }
          />

          <StatsCard
            title="Visualizações totais"
            icon={Eye}
            content={<p className="text-4xl text-center">{totalViews}</p>}
          />

          <StatsCard
            title="Faturamento bruto total"
            icon={DollarSign}
            content={
              <p className="text-4xl text-center">
                {formatPrice(revenue, "pt-BR", "BRL")}
              </p>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
