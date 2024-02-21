"use client";

import { fetchUserRestaurantsByQuery } from "@/actions/restaurant/fetchUserRestaurantsByQuery";
import BottomFade from "@/components/BottomFade";
import Navbar from "@/components/Navbar";
import { BreadcrumbRouteProps } from "@/types/breacrumb";
import { RestaurantProps } from "@/types/restaurant";
import { ReactNode, useEffect, useState } from "react";

interface LayoutProps {
  params: {
    restaurantId: string;
  };
  children: ReactNode;
}

const Layout = ({ children, params: { restaurantId } }: LayoutProps) => {
  const [restaurant, setRestaurant] = useState<RestaurantProps>(
    {} as RestaurantProps
  );

  useEffect(() => {
    fetchUserRestaurantsByQuery({
      where: {
        id: restaurantId,
      },
    }).then((data) => setRestaurant(data[0]));
  }, []);

  const breadcrumb: BreadcrumbRouteProps[] = [
    { title: "Início", route: "/restaurants" },
    { title: restaurant.title, route: "/restaurant/" + restaurantId },
    { title: "Busca", route: "/item" + "/search" + restaurantId },
  ];

  return (
    <div className="flex flex-col h-full">
      <Navbar breadcrumb={breadcrumb} />
      <div className="container">{children}</div>
      <BottomFade />
    </div>
  );
};

export default Layout;
