export interface ItemProps {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image: string;
  highlight: boolean;
  active: boolean;
  sale: boolean;
  salePrice: number | null;
  order: number;
  categoryId: string | null;
  restaurantId: string | null;
}
