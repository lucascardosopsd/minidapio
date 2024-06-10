import { fetchRestaurantsByQuery } from "@/actions/restaurant/fetchRestaurantsByQuery";
import { Metadata, ResolvingMetadata } from "next";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

interface GenerateMetadataProps {
  params?: {
    slug?: string;
    userId?: string;
  };
}

export const generateMetadata = async (
  { params }: GenerateMetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const restaurants = await fetchRestaurantsByQuery({
    where: { slug: params?.slug, userId: params?.userId },
  });
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: restaurants[0].title,
    description: `Cardápio digital ${restaurants[0].title}`,
    openGraph: {
      description: `Cardápio digital ${restaurants[0].title}`,
      title: restaurants[0].title,
      url: `${process.env.HOST}/menu/${params?.userId}/${params?.slug}`,
      images: [restaurants[0].logo, ...previousImages],
      locale: "pt-BR",
    },
  };
};

const Layout = async ({ children }: LayoutProps) => {
  return (
    <div className="relative">
      <div
        className="absolute left-0 right-0 top-0 bottom-0 mx-auto z-[100] pointer-events-none opacity-100"
        style={{
          backgroundImage: `url("/paper-texture.jpg")`,
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          mixBlendMode: "multiply",
        }}
      />
      <div className="mx-auto max-w-[600px]">{children}</div>
    </div>
  );
};

export default Layout;
