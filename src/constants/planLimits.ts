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
    categories: 10,
    items: 50,
  },
  pro: {
    restaurants: 4,
    categories: 50,
    items: 1000,
  },
};
