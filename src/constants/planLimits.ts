export interface PlanLimitProps {
  restaurants: number;
  categories: number;
  items: number;
}

export interface PlanLimitsProps {
  [key: string]: PlanLimitProps;
}

export const planLimits: PlanLimitsProps = {
  free: {
    restaurants: 1,
    categories: 5,
    items: 25,
  },
  basic: {
    restaurants: 1,
    categories: 10,
    items: 100,
  },
  pro: {
    restaurants: 4,
    categories: Infinity,
    items: Infinity,
  },
};
