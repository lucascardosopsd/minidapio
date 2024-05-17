interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  expiration?: Date;
  active: boolean;
  regionId: string;
  views: View[];
  region: Region;
  restaurantId?: string;
  restaurant?: Restaurant;
  createdAt: Date;
  updatedAt: Date;
}
