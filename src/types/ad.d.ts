export interface AdProps {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string | null;
  expiration?: Date | null;
  active: boolean;
  regionId: string;
  regionId: string;
  restaurantId?: string | null;
  restaurant?: Restaurant | null;
  createdAt: Date;
  updatedAt: Date;
}
