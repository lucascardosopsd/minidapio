import RestaurantsPagination from "@/components/admin/restaurants/RestaurantsPagination";

interface UsersPageProps {
  searchParams?: {
    page: string;
    title?: string;
  };
}

const RestaurantsPage = ({ searchParams }: UsersPageProps) => {
  const page = Number(searchParams?.page || 1);
  const title = searchParams?.title || "";

  return (
    <div className="relative w-full ">
      <RestaurantsPagination
        page={page}
        query={
          title
            ? {
                where: {
                  title: {
                    contains: title,
                    mode: "insensitive",
                  },
                },
                include: {
                  region: true,
                },
              }
            : {
                include: {
                  region: true,
                },
              }
        }
      />
    </div>
  );
};

export default RestaurantsPage;
