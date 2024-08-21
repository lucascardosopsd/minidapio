import { fetchManyAds } from "@/actions/ad/fetchManyAds";
import { fetchManyAdvertisers } from "@/actions/advertiser/fetchManyAdvertisers";
import { fetchManyPayments } from "@/actions/payments/fetchManyPayments";
import { fetchRegions } from "@/actions/region/fetchRegions";
import { fetchManyRestaurants } from "@/actions/restaurant/fetchManyRestaurants";
import { fetchManyUsers } from "@/actions/user/fetchManyUsers";
import StatsCard from "@/components/advertiser/cards/Stats";
import DateRange from "@/components/advertiser/inputs/DateRange";
import ReusableComboSearch from "@/components/misc/ReusableComboSearch";
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
    regionId?: string;
  };
}

const AdminDashboard = async ({ searchParams }: AdminDashboardProps) => {
  const startDate = searchParams?.startDate;
  const endDate = searchParams?.endDate;
  const regionId = searchParams?.regionId;

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
    query: {
      where: {
        regionId: regionId || {},
      },
    },
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
              regionId: regionId || {},
            }
          : {
              active: true,
              regionId: regionId || {},
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
          regionId: regionId || {},
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
          regionId: regionId || {},
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

  const regions = await fetchRegions();

  const regionsOptions = regions.map((region) => ({
    label: region.title,
    value: region.id,
  }));

  regionsOptions.unshift({
    label: "Todas",
    value: "",
  });

  return (
    <section className="flex flex-col items-center justify-center overflow-y-auto h-screen">
      <div className="border rounded p-5 flex flex-col gap-5">
        <div className="flex items-center gap-5 justify-between">
          <p className="text-2xl text-primary">Período</p>

          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <p className="text-xs">Filtrar região</p>
              <ReusableComboSearch
                items={regionsOptions}
                title="Filtrar região"
                queryTitle="regionId"
              />
            </div>
            <DateRange
              startDate={startDate || undefined}
              endDate={endDate || undefined}
              className="justify-center"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-5">
          <StatsCard
            title="Usuários"
            icon={User}
            content={<p className="text-4xl text-center">{users.length}</p>}
          />

          <StatsCard
            title="Anunciantes"
            icon={Megaphone}
            content={
              <p className="text-4xl text-center">{advertisers.length}</p>
            }
          />

          <StatsCard
            title="Anuncios"
            icon={Image}
            content={<p className="text-4xl text-center">{ads.length}</p>}
          />

          <StatsCard
            title="Restaurantes"
            icon={UtensilsCrossed}
            content={
              <p className="text-4xl text-center">{restaurants.length}</p>
            }
          />

          <StatsCard
            title="Visualizações de anúncio"
            icon={Eye}
            content={<p className="text-4xl text-center">{totalViews}</p>}
          />

          <StatsCard
            title="Faturamento bruto"
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
