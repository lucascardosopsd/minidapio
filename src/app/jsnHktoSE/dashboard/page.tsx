import { fetchAds } from "@/actions/ad/fetchAds";
import { fetchManyAdvertisers } from "@/actions/advertiser/fetchManyAdvertisers";
import { fetchManyPayments } from "@/actions/payments/fetchManyPayments";
import { fetchManyRestaurants } from "@/actions/restaurant/fetchManyRestaurants";
import { fetchManyUsers } from "@/actions/user/fetchManyUsers";
import StatsCard from "@/components/advertiser/cards/Stats";
import { formatPrice } from "@/tools/formatPrice";
import {
  DollarSign,
  Image,
  Megaphone,
  User,
  UtensilsCrossed,
} from "lucide-react";

const AdminDashboard = async () => {
  const { users } = await fetchManyUsers({ page: 0, take: 1000000 });
  const { restaurants } = await fetchManyRestaurants({
    page: 0,
    take: 1000000,
  });
  const { ads } = await fetchAds({
    page: 0,
    take: 1000,
    query: {
      where: {
        active: true,
      },
    },
  });
  const { advertisers } = await fetchManyAdvertisers({
    page: 0,
    take: 1000000,
  });

  const { payments } = await fetchManyPayments({ page: 0, take: 10000 });

  const revenue = payments.reduce(
    (prev, current) => (prev += current.value),
    0
  );

  return (
    <section className="flex items-center justify-center">
      <div className="border rounded p-5 flex flex-col gap-5">
        <p className="text-2xl text-primary">Global</p>

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
            title="Restaurantes totais"
            icon={UtensilsCrossed}
            content={
              <p className="text-4xl text-center">{restaurants.length}</p>
            }
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
