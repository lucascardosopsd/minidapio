export interface ItemProps {
  id: string;
  title: string;
  description?: string;
  price: number;
  image: string;
  highlight: boolean;
  active: boolean;
  sale: boolean;
  salePrice: number | null;
  categoryId: string;
  restaurantId: string;
}
