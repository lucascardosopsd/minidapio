import RestaurantsPagination from "@/components/admin/restaurants/RestaurantsPagination";

interface UsersPageProps {
  searchParams: {
    page: string;
    title?: string;
  };
}

const RestaurantsPage = ({ searchParams }: UsersPageProps) => {
  const page = Number(searchParams.page || 1);
  const title = searchParams.title || "";

  return (
    <div className="relative w-full ">
      <RestaurantsPagination
        page={page}
        query={
          title
            ? {
                where: {
                  name: {
                    contains: title,
                    mode: "insensitive",
                  },
                },
                orderBy: {
                  name: "asc",
                },
              }
            : {
                orderBy: {
                  name: "asc",
                },
              }
        }
      />
    </div>
  );
};

export default RestaurantsPage;
