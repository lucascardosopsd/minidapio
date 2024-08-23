import { PlanProps } from "@/components/restaurant/PlanCard";

export const plans: PlanProps[] = [
  {
    alias: "basic",
    title: "Básico",
    features: [
      "1 Restaurante",
      "Categorias ilimitadas",
      "Items ilimitados",
      "Suporte",
    ],
    link: "/dashboard/payment/basic",
    price: 19.9,
  },
  {
    alias: "pro",
    title: "Profissional",
    features: [
      "4 Restaurantes",
      "Categorias ilimitadas",
      "Items ilimitados",
      "Suporte",
    ],
    link: "/dashboard/payment/pro",
    price: 39.9,
    highLight: true,
  },
];
