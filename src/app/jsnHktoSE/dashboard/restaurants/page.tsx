import RestaurantsPagination from "@/components/admin/restaurants/RestaurantsPagination";
import { use } from "react";

interface UsersPageProps {
  searchParams: Promise<{
    page: string;
    title?: string;
  }>;
}

const RestaurantsPage = ({ searchParams }: UsersPageProps) => {
  const sParams = use(searchParams);
  const page = Number(sParams.page || 1);
  const title = sParams.title || "";

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
                orderBy: {
                  title: "asc",
                },
              }
            : {
                orderBy: {
                  title: "asc",
                },
              }
        }
      />
    </div>
  );
};

export default RestaurantsPage;
