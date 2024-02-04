export interface ItemProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  highlight: boolean;
  active: boolean;
  sale: boolean;
  salePrice: number | undefined;
  categoryId: number | undefined;
  restaurantId: number;
}
