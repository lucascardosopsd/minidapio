export interface CategoryProps {
  id: string;
  title: string;
  restaurantId: string | null;
}

export interface CategoriesWithItemsProps extends CategoryProps {
  items?: ItemProps[];
}
