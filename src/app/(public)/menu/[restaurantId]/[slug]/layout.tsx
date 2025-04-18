import { fetchRestaurantsByQuery } from "@/actions/restaurant/fetchRestaurantsByQuery";
import { Metadata, ResolvingMetadata } from "next";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

interface GenerateMetadataProps {
  params?: Promise<{
    slug?: string;
    userId?: string;
    restaurantId?: string;
  }>;
}

export const generateMetadata = async (
  { params }: GenerateMetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const paramsObj = await params;

  const { restaurants } = await fetchRestaurantsByQuery({
    take: 10,
    page: 0,
    query: {
      where: { id: paramsObj?.restaurantId },
    },
  });
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: restaurants[0]?.title,
    description: `Cardápio digital ${restaurants[0]?.title}`,
    openGraph: {
      description: `Cardápio digital ${restaurants[0]?.title}`,
      title: restaurants[0]?.title,
      url: `${process.env.HOST}/menu/${paramsObj?.restaurantId}/${paramsObj?.slug}`,
      images: restaurants[0]?.logo ? [restaurants[0].logo, ...previousImages] : previousImages,
      locale: "pt-BR",
    },
  };
};

const Layout = async ({ children }: LayoutProps) => {
  return (
    <div className="dark:bg-gradient-to-t from-zinc-900/50 via-transparent to-zinc-900/50">
      <div className="bg-gradient-to-t from-background to-transparent h-44 w-full absolute bottom-0 left-0 z-[60]" />
      <div className="mx-auto max-w-[600px]">{children}</div>
    </div>
  );
};

export default Layout;
