import { fetchPaymentsByQuery } from "@/actions/payment/fetchPaymentsByQuery";
import { fetchManyRestaurants } from "@/actions/restaurant/fetchManyRestaurants";
import { fetchManyUsers } from "@/actions/user/fetchManyUsers";
import DateRange from "@/components/misc/DateRange";
import ReusableComboSearch from "@/components/misc/ReusableComboSearch";
import StatsCard from "@/components/misc/Stats";
import { provinces } from "@/constants/brazilianProvinces";
import { formatPrice } from "@/tools/formatPrice";

import { DollarSign, User, UtensilsCrossed } from "lucide-react";

interface AdminDashboardProps {
  searchParams: Promise<{
    startDate?: Date;
    endDate?: Date;
    province?: string;
    userId: string;
  }>;
}

const AdminDashboard = async ({ searchParams }: AdminDashboardProps) => {
  const { startDate, endDate, province, userId } = await searchParams;

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
        userId: userId,
        isActive: true,
      },
    },
  });

  const { payments } = await fetchPaymentsByQuery({
    page: 0,
    take: 10000,
    query: {
      where: endDate &&
        startDate && {
          createdAt: {
            lte: new Date(endDate),
            gte: new Date(startDate),
          },
          userId: userId,
        },
    },
  });

  const revenue = payments.reduce(
    (prev, current) => (prev += current.amount),
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

  const usersOptions = users.map((user) => ({
    label: user.name!,
    value: user.id!,
  }));

  return (
    <section className="flex flex-col items-center justify-center overflow-y-auto h-screen">
      <div className="border rounded p-5 flex flex-col gap-5">
        <div className="flex items-center gap-5 justify-between">
          <p className="text-2xl text-primary">Geral</p>

          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <p className="text-xs">Filtrar região</p>
              <ReusableComboSearch
                items={provinceOptions}
                title="Filtrar região"
                queryTitle="province"
              />
            </div>

            <div className="flex flex-col">
              <p className="text-xs">Filtrar usuário</p>
              <ReusableComboSearch
                items={usersOptions}
                title="Filtrar usuário"
                queryTitle="userId"
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
