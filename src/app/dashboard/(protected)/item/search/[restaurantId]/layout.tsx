"use client";
import { fetchUserRestaurantsByQuery } from "@/actions/restaurant/fetchUserRestaurantsByQuery";
import Navbar from "@/components/restaurant/Navbar";
import { BreadcrumbRouteProps } from "@/types/breacrumb";
import { RestaurantProps } from "@/types/restaurant";
import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface LayoutProps {
  params: {
    restaurantId: string;
  };
  children: ReactNode;
}

const Layout = ({ children, params }: LayoutProps) => {
  const { restaurantId } = params;

  const [restaurant, setRestaurant] = useState<RestaurantProps>(
    {} as RestaurantProps
  );

  useEffect(() => {
    fetchUserRestaurantsByQuery({
      where: {
        id: restaurantId,
      },
    }).then((data) => {
      if (data[0]) {
        setRestaurant({
          id: data[0].id,
          title: data[0].name,
          active: data[0].isActive,
          landline: null,
          whatsapp: null,
          address: data[0].address,
          methods: data[0].methods as any,
          workHours: data[0].workHours as any,
          logo: "",
          color: "",
          linkMaps: null,
          note: data[0].description,
          activeMenu: true,
          slug: "",
          createdAt: data[0].createdAt,
          updatedAt: data[0].updatedAt,
          userId: data[0].userId,
          state: "",
          province: "",
        });
      }
    });
  }, []);

  const searchParams = useSearchParams();

  const breadcrumb: BreadcrumbRouteProps[] = [
    { title: "Início", route: "/dashboard/restaurants" },
    { title: restaurant.title, route: "/dashboard/restaurant/" + restaurantId },
    {
      title: "Busca",
      route:
        "/item" + "/search/" + restaurantId + "?" + searchParams.toString(),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <Navbar breadcrumb={breadcrumb} />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
