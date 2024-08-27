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
    items: 50,
  },
  pro: {
    restaurants: 2,
    categories: 40,
    items: 200,
  },
  elite: {
    restaurants: 8,
    categories: Infinity,
    items: Infinity,
  },
};
