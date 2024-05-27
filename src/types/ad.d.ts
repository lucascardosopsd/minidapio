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
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FullAdProps extends AdProps {
  clicks: ClickProps[];
  views: ViewProps[];
}

export interface ClickProps {
  id: string;
  adId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ViewProps {
  id: string;
  adId: string;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
}
