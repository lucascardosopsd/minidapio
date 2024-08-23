"use client";

import { fetchUserRestaurantsByQuery } from "@/actions/restaurant/fetchUserRestaurantsByQuery";
import BottomFade from "@/components/restaurant/BottomFade";
import Navbar from "@/components/restaurant/Navbar";
import { BreadcrumbRouteProps } from "@/types/breacrumb";
import { RestaurantProps } from "@/types/restaurant";
import { ReactNode, useEffect, useState } from "react";

interface LayoutProps {
  params: {
    id: string;
  };
  children: ReactNode;
}

const Layout = ({ children, params: { id } }: LayoutProps) => {
  const [restaurant, setRestaurant] = useState<RestaurantProps>(
    {} as RestaurantProps
  );

  useEffect(() => {
    fetchUserRestaurantsByQuery({
      where: {
        id,
      },
    }).then((data) => setRestaurant(data[0]));
  }, []);

  const breadcrumb: BreadcrumbRouteProps[] = [
    { title: "Início", route: "/dashboard/restaurants" },
    { title: restaurant.title, route: "/dashboard/restaurant/" + id },
  ];

  return (
    <div>
      <Navbar breadcrumb={breadcrumb} />
      <div className="container h-[calc(100svh-70px)] flex overflow-y-auto py-5">
        {children}
      </div>
      <BottomFade />
    </div>
  );
};

export default Layout;
