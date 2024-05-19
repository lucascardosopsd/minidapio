import RestaurantsPagination from "@/components/admin/users/restaurantsPagination";

interface UsersPageProps {
  searchParams?: {
    page: string;
  };
}

const RestaurantsPage = ({ searchParams }: UsersPageProps) => {
  const page = Number(searchParams?.page || 1);

  return (
    <div className="relative w-full ">
      <RestaurantsPagination page={page} />
    </div>
  );
};

export default RestaurantsPage;
