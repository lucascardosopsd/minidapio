import { fetchManyPayments } from "@/actions/payments/fetchManyPayments";
import { fetchManyRestaurants } from "@/actions/restaurant/fetchManyRestaurants";
import { fetchManyUsers } from "@/actions/user/fetchManyUsers";
import DateRange from "@/components/misc/DateRange";
import ReusableComboSearch from "@/components/misc/ReusableComboSearch";
import StatsCard from "@/components/misc/Stats";
import { provinces } from "@/constants/brazilianProvinces";
import { formatPrice } from "@/tools/formatPrice";

import { DollarSign, User, UtensilsCrossed } from "lucide-react";

interface AdminDashboardProps {
  searchParams?: {
    startDate?: Date;
    endDate?: Date;
    province?: string;
  };
}

const AdminDashboard = async ({ searchParams }: AdminDashboardProps) => {
  const startDate = searchParams?.startDate;
  const endDate = searchParams?.endDate;
  const province = searchParams?.province;

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
        province: province || {},
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

  const provinceOptions = Object.keys(provinces).map((province) => ({
    label: province,
    value: province,
  }));

  provinceOptions.unshift({
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
                items={provinceOptions}
                title="Filtrar região"
                queryTitle="province"
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
            title="Restaurantes"
            icon={UtensilsCrossed}
            content={
              <p className="text-4xl text-center">{restaurants.length}</p>
            }
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
