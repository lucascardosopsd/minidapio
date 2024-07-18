export interface CustomAdFormProps {
  title: string;
  description: string;
  image: string;
  link?: string | null;
  active: boolean;
  regionId: string;
  userId: string | null;
  cta: string;
  advertiserAccountId: string;
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
