import { PlanLimitProps } from '@/constants/planLimits';
import { RestaurantCard } from './cards/Restaurant';
import { RestaurantProps } from '@/types/restaurant';

interface RestaurantListProps {
  restaurants: RestaurantProps[];
  limits: PlanLimitProps;
}

export const RestaurantList = ({ restaurants, limits }: RestaurantListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {restaurants.map(restaurant => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} limits={limits} />
      ))}
    </div>
  );
};
