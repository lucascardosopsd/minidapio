export interface CategoryProps {
  id: string;
  title: string;
  order: number;
  restaurantId: string | null;
}

export interface CategoriesWithItemsProps extends CategoryProps {
  items?: ItemProps[];
}
