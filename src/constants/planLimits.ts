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
  pro: {
    restaurants: 2,
    categories: 30,
    items: 200,
  },
};
